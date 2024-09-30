const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./users');
const APIError = require('../utils/error');

class AuthService {
  static async getUser(email, password) {
    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new APIError(401, 'Unauthorized.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new APIError(401, 'Unauthorized.');
    }
    delete user.dataValues.password;
    return user;
  }

  static async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '10min',
    });

    return { user, token };
  }

  static async recoveryPassword(email) {
    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new APIError(401, 'Unauthorized.');
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '10min',
    });
    const link = `http://myfrontend.com/recovery?token=${token}`;

    await UserService.update(user.id, { recoveryToken: token });

    const mail = {
      from: config.nmEmail,
      to: `${user.email}`,
      subject: 'Recuperar Contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`,
    };

    const result = await this.sendMail(mail);
    return result;
  }

  static async changePassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      const user = await UserService.findById(decoded.sub);

      if (user.recoveryToken !== token) {
        throw new APIError(401, 'Unauthorized.');
      }

      const hash = await bcrypt.hash(newPassword, 12);

      await UserService.update(user.id, {
        recoveryToken: null,
        password: hash,
      });

      return { message: 'password changed!' };
    } catch (error) {
      throw new APIError(401, 'Unauthorized');
    }
  }

  static async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.nmEmail,
        pass: config.nmPassword,
      },
    });
    await transporter.sendMail(infoMail);

    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
