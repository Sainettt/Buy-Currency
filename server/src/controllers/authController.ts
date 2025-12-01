import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

const generateJwt = (id: number, email: string) => {
    return jwt.sign(
        { id, email },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
    );
};

class AuthController {

    async registration(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email и пароль обязательны' });
            }

            const candidate = await prisma.user.findUnique({ where: { email } });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashPassword
                }
            });

            const token = generateJwt(user.id, user.email);

            return res.json({ token });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка регистрации' });
        }
    }

    async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }
            
            const token = generateJwt(user.id, user.email);

            return res.json({ token });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка входа' });
        }
    }
}

export default new AuthController();