import { promises } from "dns";
import { db } from "../utils/db.server";
import {  Announcement, Service, typeAnimal } from '@prisma/client' 


export const listAnnouncement = async (): Promise<Announcement[]> => {
    return db.announcement.findMany({
        select: {
            id: true,
            type: true,
            firstName : true,
            lastName : true,
            contact : true,
            experience : true,
            level : true ,
            image : true,
            ville : true,
            description: true,
            city: true,
            comment : true,
            userId : true
        },
    });
}; 
export interface AvgStarsInfo {
    avgStars: number;
    commentCount: number;
  }
  
  export const getAvgStars = async (id: number): Promise<AvgStarsInfo> => {
    const announcement = await db.announcement.findUnique({
      where: { id: id },
      include: { comment: true },
    });
  
    if (!announcement) {
      throw new Error(`Announcement with ID ${id} not found.`);
    }
  
    const commentCount = announcement.comment.length;
  
    if (commentCount === 0) {
      return { avgStars: 0, commentCount: commentCount };
    }
  
    const totalStars = announcement.comment.reduce(
      (acc, comment) => acc + comment.stars,
      0
    );
    const avgStars =  Math.round(totalStars / commentCount ) 
    
    return {  avgStars , commentCount };
  };
  
  

export const getOneAnnouncement = async (id: number): Promise<Announcement | null> => {
    return db.announcement.findUnique({
        where: { id : id },
    });
};  


export const getAnnouncementsByCityAndType = async ( type: Service , city : string): Promise<Announcement[]> => {
    return db.announcement.findMany({
        where: { 
            city,
            type,
        },
        select: {
            id: true,
            type: true,
            firstName : true,
            lastName : true,
            contact : true,
            experience : true,
            level : true ,
            image : true,
            ville : true,
            comment : true,
            description: true,
            city: true,
            userId : true
        },
    });
};



export const createAnnouncement = async (
    announcement: Omit<Announcement, "id">
): Promise<Announcement> => {
    const { type, firstName,lastName,contact,ville,image,experience,level,description, city,  userId} = announcement;
    return db.announcement.create({
        data: {
            type,
            description,
            firstName,
            lastName,
            contact,
            ville,
            experience,
            level,
            image,
            city, 
            userId,

        },
        select: {
            id: true,
            type: true,
            firstName : true,
            lastName : true,
            contact : true,
            experience : true,
            level : true ,
            image : true,
            ville : true,
            description: true,
            city: true,
            userId : true
        },
    });
};



export const updateAnnouncement1 = async (announcement: Omit<Announcement, "id">, id: number): Promise<Announcement> => {
    const { type, firstName,lastName,contact,ville,image,experience,level,description, city,  userId} = announcement;
    return db.announcement.update({
        where: {
            id,
        },
        data: {
            type,
            description,
            firstName,
            lastName,
            contact,
            ville,
            experience,
            level,
            image,
            city, 
            userId,

        },
        select: {
            id: true,
            type: true,
            firstName : true,
            lastName : true,
            contact : true,
            experience : true,
            level : true ,
            image : true,
            ville : true,
            description: true,
            city: true,
            userId : true
            

        },
    });
};

export const deleteAnnouncement = async (id: number): Promise<void> => {
    await db.announcement.delete({
        where: {
            id: id,
        },
    });
};



