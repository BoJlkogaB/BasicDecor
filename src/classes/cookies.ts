export class Cookies {
  static setRefreshToken(response, refreshToken) {
    response.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      withCredentials: true,
    });
  }
}
