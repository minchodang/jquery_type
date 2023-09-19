import flash from "connect-flash";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler, RequestHandler } from "express";
import session from "express-session";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("./public"));
app.use(cookieParser());
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//미들웨어는 RequestHandler 타입이다.

const middleware: RequestHandler<
  { paramType: string },
  { message: string },
  { bodyType: symbol },
  {
    queryType: boolean;
  },
  {
    localType: number;
  }
> = (req, res, next) => {
  req.params.paramType;
  req.body.bodyType;
  req.query.queryType;
  res.locals.localType;
  res.json({
    message: "hello",
  });
  req.flash("플래시메시지");
  req.flash("1회성", "플레시메시지");
  req.flash();

  req.session;
  req.user?.minsu;
};
app.get("/", middleware);

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
};

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log("server is running");
});
