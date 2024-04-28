import { userModel } from "../../Models/user.model.js";
import mongoose from "mongoose";
import __dirname from "../../../dirname.js";
import { createHash } from "../../../utils/authorizations.js";
import UserDTO from "../../DTOS/user.dto.js";

export default class UserDao {
  async getAll() {
    try {
      let usuarios = await userModel.find();
      let users = [];
      usuarios.forEach((user) => {
        let DTO1 = new UserDTO(
          user.first_name,
          user.last_name,
          user.email,
          user.rol
        );
        users.push(DTO1);
      });
      return users;
    } catch (error) {
      return error;
    }
  }

  async getUser(uid) {
    try {
      if (mongoose.Types.ObjectId.isValid(uid)) {
        return await userModel.findById(uid);
      }
      logger.error("ID format not valid");
    } catch (error) {
      return error;
    }
  }

  async updateUserStatus(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const userExists = await userModel.findById(_id);

        if (userExists) {
          //solo actualizar el estado si los documentos que se suben son los necesarios
          await userModel.findByIdAndUpdate(
            { _id },
            { status: "docsUploaded" }
          );
        }
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  }
  async updateUserRole(_id, role) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const userExists = await userModel.findById(_id);

        if (userExists) {
          let result = await userModel.findByIdAndUpdate(
            { _id },
            { rol: role }
          );
          return result;
        }
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  }

  async updateUserFiles(_id, imgName, imgPath) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const userExists = await userModel.findById(_id);

        if (userExists) {
          let result = await userModel.findByIdAndUpdate(
            { _id },
            {
              $push: {
                documents: {
                  name: imgName,
                  reference: imgPath,
                },
              },
            }
          );
          return result;
        }
        return "User not found";
      }
    } catch (error) {
      return error;
    }
  }

  async updatePassword(email, password) {
    try {
      console.log("llego al dao");
      const newPassword = createHash(password);
      console.log(email);
      console.log(newPassword);
      const result = await userModel.findOneAndUpdate(
        { email: email },
        { password: newPassword }
      );

      console.log(result);
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateConnection(email, loginTime) {
    try {
      const result = await userModel.findOneAndUpdate(
        { email: email },
        { last_connection: loginTime }
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async findUser(email) {
    try {
      const userExists = await userModel.findOne({ email: email });
      return userExists;
    } catch (error) {
      return error;
    }
  }

  async createUser(user) {
    //mejorar esta función para que cree al usuario
    try {
      // const newUserDTO = new UserDTO(user);

      // const result = await userModel.create(newUserDTO);
      const result = await userModel.create(user);
      return result;
    } catch (error) {
      return error;
    }
  }
  async deleteUser(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        return await userModel.findByIdAndDelete(_id);
      }
      return "Id format not valid";
    } catch (error) {
      return error;
    }
  }
}
