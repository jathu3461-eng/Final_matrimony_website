import request from 'supertest';
import express from 'express';
import profileRoutes from './profile.routes';
import prisma from '../config/db';

jest.mock('../config/db', () => ({
  __esModule: true,
  default: {
    profile: {
      findFirst: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    photo: {
      create: jest.fn(),
    },
  },
}));

jest.mock('../middleware/auth.middleware', () => ({
  authenticate: (req: any, _res: any, next: () => void) => {
    req.user = { id: 1, roles: ['user'] };
    next();
  },
}));

jest.mock('../middleware/rateLimit.middleware', () => ({
  apiRateLimiter: (_req: any, _res: any, next: () => void) => next(),
}));

describe('Profile routes — create profile payload compatibility', () => {
  const app = express();

  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.profile.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.profile.count as jest.Mock).mockResolvedValue(0);
    (prisma.profile.create as jest.Mock).mockResolvedValue({
      id: 42,
      userId: 1,
      profileRegisteredFor: 'self',
      name: 'Test User',
      gender: 'F',
      dateOfBirth: '2000-01-01T00:00:00.000Z',
      heightCm: 165,
      religionId: 1,
      casteId: 1,
      raasiId: 1,
      starId: 1,
      bornCountryId: 1,
      currentCountryId: 1,
      cityOrState: 'Colombo',
      mainProfilePicture: null,
      aboutMe: 'I am a test profile description with enough length.',
    });
  });

  app.use(express.json());
  app.use('/api/v1/profiles', profileRoutes);

  it('accepts snake_case profile data from the mobile/web apps', async () => {
    const res = await request(app)
      .post('/api/v1/profiles')
      .send({
        profile_registered_for: 'self',
        name: 'Test User',
        gender: 'F',
        date_of_birth: '2000-01-01',
        height_feet: 5,
        height_inches: 6,
        religion_id: 1,
        caste_id: 1,
        raasi_id: 1,
        star_id: 1,
        born_country_id: 1,
        current_country_id: 1,
        city_or_state: 'Colombo',
        about_me: 'I am a test profile description with enough length.',
      });

    expect(res.status).toBe(201);
    expect(prisma.profile.create).toHaveBeenCalled();
    expect(res.body.profile).toBeDefined();
  });
});
