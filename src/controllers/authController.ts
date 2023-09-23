import { Request, Response } from "express"
import authService from "../services/authService"

export async function signUp(req: Request, res: Response) {
  const { name, email } = req.body

  const result = await authService.registerUser(name, email)

  res.json(result)
}