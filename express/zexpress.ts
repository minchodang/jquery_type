interface Application {
  use(middleware: RequestHandler | ErrorRequestHandler): void;
  use(path: string, middleware: RequestHandler | ErrorRequestHandler): void;
  get(path: string, ...middleware: RequestHandler[]): void;
  listen(port: number, callback: () => void): void;
}
interface ZExpress {
  (): Application;
  json(): RequestHandler;
  urlencoded({ extended }: { extended: boolean }): RequestHandler;
  static(path: string): RequestHandler;
}

interface CookieParser {
  (secret: string): RequestHandler;
}

interface Session {
  ({ secret }: { secret: string }): RequestHandler;
}

interface Flash {
  (): RequestHandler;
}
interface Passport {
  initialize(): RequestHandler;
  session(): RequestHandler;
}
interface Error {
  status: number;
}

declare namespace ZExpress {
  interface Request {
    session: {
      sessionData: string;
    };
    user?: {
      minsu: string;
    };
    flash(key?: string, value?: string): void;
  }
  interface Locals {
    hello: string;
  }
}

interface ZRequest<Param, Query, ReqBody> extends ZExpress.Request {
  params: Param;
  query: Query;
  body: ReqBody;
}
interface ZResponse<ResBody, Locals> {
  locals: Locals & ZExpress.Locals;
  json(data: ResBody): void;
}
interface NextFunction {
  (to?: string): void;
}

interface RequestHandler<
  Param = any,
  Query = any,
  ReqBody = any,
  ResBody = any,
  Locals = ZExpress.Locals
> {
  (
    req: ZRequest<Param, Query, ReqBody>,
    res: ZResponse<ResBody, Locals>,
    next: NextFunction
  ): void;
}
interface ErrorRequestHandler<
  Param = any,
  Query = any,
  ReqBody = any,
  ResBody = any,
  Locals = ZExpress.Locals
> {
  (
    err: Error,
    req: ZRequest<Param, Query, ReqBody>,
    res: ZResponse<ResBody, Locals>,
    next: NextFunction
  ): void;
}
declare const express: ZExpress;
declare const cookieParser: CookieParser;
declare const flash: Flash;
declare const session: Session;
declare const passport: Passport;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static("./public"));
app.use(cookieParser("SECRET"));
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//미들웨어는 RequestHandler 타입.

const middleware: RequestHandler<
  { paramType: string },
  { queryType: string },
  { bodyType: symbol },
  { message: string },
  { hello: string }
> = (req, res, next) => {
  req.params.paramType;
  req.body.bodyType;
  req.query.queryType;
  res.locals.hello = "world";
  req.session.sessionData;
  req.user?.minsu;
  req.flash("플래시메시지");
  req.flash("1회성", "플레시메시지");
  req.flash();
  res.json({
    message: "hello",
  });
};

app.get(
  "/",
  (req, res, next) => {
    res.locals.hello;
    next("route");
  },
  middleware
);

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.status);
};

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log("server is running");
});
