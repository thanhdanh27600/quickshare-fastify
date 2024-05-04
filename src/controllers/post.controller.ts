import clsx from "clsx";
import { FastifyReply, FastifyRequest } from "fastify"
import { pb } from "../pocketbase";

export const getManyPost = async (request: FastifyRequest, reply: FastifyReply) => {
    const query = request.query;
    const title = query['title'];
    const slug = query['slug'];
    const resultList = await pb.collection('post').getList(1, 10, {
        filter: clsx({
            [`title~"${title}"`]: !!title
        }, {
            [`&&slug~"${slug}"`]: !!slug
        }),
        expand: 'thumbnail',
        fields: 'id,slug,title,expand.thumbnail.id,expand.thumbnail.file',
    });
    reply.send(resultList);

}


export const getOnePost = async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params;
    const slug = params['slug'];
    const record = await pb.collection('post').getFirstListItem(`slug="${slug}"`,{
        expand: 'thumbnail'
    });
    reply.send(record);

}


export const postController = { getManyPost, getOnePost }