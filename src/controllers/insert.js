import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";

// export const insertData = async (req, res) =>{
//     try {
//         const response = await service.insertData()
//         return res.status(200).json(response)
//     } catch (error) {
//         return internalServerError(res)
//     }
// }