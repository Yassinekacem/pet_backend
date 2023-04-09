import * as dotenv from "dotenv" ; 
import express from "express"; 
import cors from "cors" ; 
import { userRouter } from "./user/user.router"; 
import { authRouter } from "./authentification/auth.router";
import { productRouter } from "./product/product.router";
import { announcementRouter } from "./Announcement/announcement.router";
import { animalRouter } from "./Animal/animal.router";
import { lostdeclarationRouter } from "./Declarations/LostDeclaration/LostDeclaration.router";
import { FoundDeclarationRouter } from "./Declarations/FoundDeclaration/FoundDeclaration.router";


dotenv.config() ;
console.log('test :)')
if(!process.env.PORT) {
    process.exit(1) ; 
} 
const PORT : number = parseInt(process.env.PORT as string,10) ; 
const app = express() ; 
app.use(cors()) ; 
app.use(express.json()) ; 
app.use ("/users",userRouter) 
app.use ("/auth" , authRouter)
app.use ("/products" , productRouter)
app.use ("/announcements", announcementRouter)
app.use("/animals",animalRouter)
app.use("/lostDeclarations",lostdeclarationRouter)
app.use("/foundDeclarations",FoundDeclarationRouter)
app.listen(PORT , ()=> {
    console.log(`app listening on port ${PORT}`) ; 
})
