import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppErrors';
import { StatusCodes } from 'http-status-codes';
import { TStudent } from './student.interface';
import User from '../user/user.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  
  const result = await Student.findOne({id})
    .populate('admissionSemester')
    .populate({ path: 'academicDepartment', populate: 'academicFaculty' });
  return result;
};

const updatedStudentFromDB = async ( id : string , payload : Partial<TStudent>) => {


  const result = await Student.findOneAndUpdate({id} , payload , {new : true} );
  return result;

}


const deleteStudentFromDB = async (id: string) => {
  // create session 

  const session = await mongoose.startSession();

  

 try {
  // start Transaction
  session.startTransaction();

  // Transaction - 1
  const deletedStudent = await Student.findOneAndUpdate(
    { id},
    { isDeleted: true },
    {new : true}
  );
  if (!deletedStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found');
  }
// Transaction - 2
  const deletedUser = await User.findOneAndUpdate(
    {id},
    {isDeleted : true},
    {new: true}
  )
  if (!deletedUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }


  await session.commitTransaction();
  await session.endSession();
  return deletedStudent;
 } catch (error) {
  await session.abortTransaction();
  await session.endSession();
  throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to Delete' )

 }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updatedStudentFromDB
};
