import { Types } from "mongoose";

export interface TPreRequisiteCourse {
    course : Types.ObjectId,
    isDeleted : boolean,
}

export interface TCourse {
    title : string,
    prefix : string,
    code : number,
    credits : number,
    isDeleted?: boolean,
    preRequisiteCourse : [TPreRequisiteCourse];

}

export interface TCourseFaculties {
    course : Types.ObjectId,
    faculties : [Types.ObjectId],
}