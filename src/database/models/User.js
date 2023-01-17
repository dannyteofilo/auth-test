import { model, Schema } from 'mongoose'
import { timestampToDate } from '../../helpers'

const UserSchema = new Schema(
  {
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    avatar: { type: String, default: 'https://picsum.photos/200' },
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    active: { type: Boolean, default: true },
    createdAt: { type: Number, default: ~~(new Date().getTime() / 1e3) },
    updatedAt: { type: Number, default: ~~(new Date().getTime() / 1e3) }
  },
  { timestamps: false, _id: true, versionKey: false }
)

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.createdAt = timestampToDate({ timestamp: returnedObject.createdAt })
    returnedObject.updatedAt = timestampToDate({ timestamp: returnedObject.updatedAt })
    delete returnedObject.password
  }
})

const User = model('User', UserSchema)
module.exports = User
