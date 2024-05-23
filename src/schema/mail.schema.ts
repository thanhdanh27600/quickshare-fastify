import S from "fluent-json-schema";
import {MAIL_HEADER} from "../utils/constants";

export const mailNoticeSchema = {
	body: S.object().prop("to", S.string().format(S.FORMATS.EMAIL).required()),
	headers: S.object()
		.prop(MAIL_HEADER.client, S.string().required())
		.prop(MAIL_HEADER.key, S.string().required()),
};
