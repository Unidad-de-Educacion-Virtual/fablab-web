export interface TokenPayload {
  sub: string;
  rol: "ADMIN" | "INSTRUCTOR";
  exp: number;
}
