interface Request {}
interface Response {
  writeHead(statusCode: number): void;
  end(data: Buffer): void;
}
interface Server {
  listen(port: number, callback: () => void): void;
}

interface Http {
  createServer(callback: (req: Request, res: Response) => void): Server;
}
declare const http: Http;
interface FsPromises {
  readFile(path: string): Promise<Buffer>;
}
interface Fs {
  readFile(path: string, callback: (err: unknown, data: Buffer) => void): void;
  promises: FsPromises;
}

declare const fs: Fs;
interface Path {
  join(...paths: string[]): string;
}
declare const path: Path;
