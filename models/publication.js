import { model, models, Schema} from "mongoose";

const PublicationUserSchema = new Schema({
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'User',    /* relacion uno a muchos: un usuario puede crear muchas publicaciones */
    },
    title: {
        type: String,
        required: [true, 'Publication is required.'],
    },
    publication: {
        type: String,
        required: [true, 'Publication is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    },
});

const PublicationUser = models.PublicationUser || model('PublicationUser', PublicationUserSchema);

export default PublicationUser
