import S from 'fluent-json-schema'


export const getManyPostSchema = {
    query: S.object(),
    params: S.object(),
    headers: S.object(),
}

export const getOnePostSchema = {
    params: S.object().prop('slug', S.string().required()),
    headers: S.object(),
}
