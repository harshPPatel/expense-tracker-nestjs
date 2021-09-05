import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class ChangeThemeDto {
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @Min(0)
  @Max(3) // TODO: Change these values in app with constants!!!
  theme: number;
}
