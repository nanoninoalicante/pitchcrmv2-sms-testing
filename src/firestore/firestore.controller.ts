import { Controller, UseInterceptors } from "@nestjs/common";
import { ErrorsInterceptor } from "src/interceptors/exception.interceptor";
import { LoggingInterceptor } from "src/interceptors/logging.interceptor";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
@UseInterceptors(new LoggingInterceptor())
@UseInterceptors(new ResponseInterceptor())
@UseInterceptors(new ErrorsInterceptor())
@Controller("firestore")
export class FirestoreController {}
