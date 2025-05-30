import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const token = this.generateToken(user.data);
    return ResponseHelper.sendResponse({
      msg: 'User created successfully', 
      statusCode: 200,
      data: user.data,
      token: token
    });
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    

    const token = this.generateToken(user);
    const { password: _, ...result } = user;
    return { user: result, token };
  }

  private generateToken(user: IUser) {
    const payload = { 
      sub: user.id,
      email: user.email,
      role: user.role
    };
    return this.jwtService.sign(payload);
  }
} 