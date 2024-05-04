import S from 'fluent-json-schema'


export const getManyPostSchema = {
    query: S.object(),
    params: S.object(),
    headers: S.object(),
}

export const getOnePostSchema = {
    query: S.object().prop('slug', S.string().required()),
    params: S.object().id('id'),
    headers: S.object(),
}
