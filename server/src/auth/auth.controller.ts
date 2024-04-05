import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post("/sign-up")
  @HttpCode(201)
  async signUp(@Body() body: any) {
    const user = await this.authService.signUp(body);
    console.log(user);
    
        return{
      message: 'Đăng ký thành công',
      data: user
    }
    
  }
  @Post("/sign-google")
  @HttpCode(201)
  async loginByGoogle(@Body() body: any) {
    const user = await this.authService.loginByGoogle(body);
    console.log(user);
        return{
      message: 'Đăng nhập thành công',
      data: user
    }
    
  }
  @Post("/sign-facebook")
  @HttpCode(201)
  async loginByFaceBook(@Body() body: any) {
    const user = await this.authService.loginByFaceBook(body);
    console.log(user);
        return{
      message: 'Đăng nhập thành công',
      data: user
    }
    
  }
  @Post('/sign-in')
  @HttpCode(200)
  async signIn( @Body() user:{email:string,password:string}) {
    const users = await this.authService.signIn(user);
    return {
      message: 'Đăng nhập thành công',
      data: users
    }
   
    
  }
}
