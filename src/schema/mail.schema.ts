import S from "fluent-json-schema";

export const mailNoticeSchema = {
    body: S.object(),
    headers: S.object().prop('x-qsh-client', S.string().required()).prop('x-qsh-key', S.string().required()),
}