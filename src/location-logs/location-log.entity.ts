import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Area } from '../areas/area.entity';
import { Location } from '../locations/location.entity';

@Entity()
export class LocationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  area_id: string;

  @ManyToOne(() => Area, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'area_id' })
  area: Area;

  @ManyToOne(() => Location, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @CreateDateColumn()
  created_at: Date;
}
