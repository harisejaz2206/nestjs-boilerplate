import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Generic account baseline for the template. Product-specific profile data
// should live in feature modules that relate back to this user.
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 254 })
  email: string;

  @Column({ length: 100 })
  name: string;

  // Never store plain-text passwords. This field is excluded from default selects.
  @Column({ select: false })
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
