// core
import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();
  
  public initializeOptions() {
    return this.builder
    	.setTitle('Temp API')
    	.setDescription('Temp Test')
    	.setVersion('1.0.0')
    	.build();
  }
}