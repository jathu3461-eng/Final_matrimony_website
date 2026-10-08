
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  isSystem: 'isSystem',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  roleId: 'roleId',
  permissionId: 'permissionId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  email: 'email',
  phoneNumber: 'phoneNumber',
  password: 'password',
  accountType: 'accountType',
  isEmailVerified: 'isEmailVerified',
  isPhoneVerified: 'isPhoneVerified',
  isApproved: 'isApproved',
  isSuspended: 'isSuspended',
  uiLanguage: 'uiLanguage',
  lastLoginAt: 'lastLoginAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  userId: 'userId',
  roleId: 'roleId',
  grantedAt: 'grantedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  refreshToken: 'refreshToken',
  deviceName: 'deviceName',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  isRevoked: 'isRevoked',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.OtpCodeScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  otpHash: 'otpHash',
  purpose: 'purpose',
  attemptCount: 'attemptCount',
  expiresAt: 'expiresAt',
  usedAt: 'usedAt',
  createdAt: 'createdAt'
};

exports.Prisma.EmailVerificationScalarFieldEnum = {
  id: 'id',
  email: 'email',
  otp: 'otp',
  expiresAt: 'expiresAt',
  verified: 'verified',
  createdAt: 'createdAt'
};

exports.Prisma.BrokerProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  agencyName: 'agencyName',
  licenseNumber: 'licenseNumber',
  isVerified: 'isVerified',
  maxProfileQuota: 'maxProfileQuota',
  whatsappNumber: 'whatsappNumber',
  country: 'country',
  state: 'state',
  district: 'district',
  officeAddress: 'officeAddress',
  yearsOfExperience: 'yearsOfExperience',
  numberOfActiveClients: 'numberOfActiveClients',
  registrationNumber: 'registrationNumber',
  governmentIdUrl: 'governmentIdUrl',
  profilePhotoUrl: 'profilePhotoUrl',
  websiteUrl: 'websiteUrl',
  verificationStatus: 'verificationStatus',
  rejectionReason: 'rejectionReason',
  approvedAt: 'approvedAt',
  otpCode: 'otpCode',
  otpExpiresAt: 'otpExpiresAt',
  isEmailVerified: 'isEmailVerified',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReligionScalarFieldEnum = {
  id: 'id',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  sortOrder: 'sortOrder',
  isActive: 'isActive'
};

exports.Prisma.CasteScalarFieldEnum = {
  id: 'id',
  religionId: 'religionId',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  sortOrder: 'sortOrder',
  isActive: 'isActive'
};

exports.Prisma.SubCasteScalarFieldEnum = {
  id: 'id',
  casteId: 'casteId',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  isActive: 'isActive'
};

exports.Prisma.RaasiScalarFieldEnum = {
  id: 'id',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  numeralCode: 'numeralCode'
};

exports.Prisma.StarScalarFieldEnum = {
  id: 'id',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  numeralCode: 'numeralCode',
  raasiId: 'raasiId'
};

exports.Prisma.CountryScalarFieldEnum = {
  id: 'id',
  iso2: 'iso2',
  iso3: 'iso3',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  dialingCode: 'dialingCode',
  priority: 'priority',
  isActive: 'isActive'
};

exports.Prisma.StateScalarFieldEnum = {
  id: 'id',
  countryId: 'countryId',
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.CityScalarFieldEnum = {
  id: 'id',
  stateId: 'stateId',
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.MotherTongueScalarFieldEnum = {
  id: 'id',
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.EducationCategoryScalarFieldEnum = {
  id: 'id',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  sortOrder: 'sortOrder'
};

exports.Prisma.EducationDetailScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.OccupationCategoryScalarFieldEnum = {
  id: 'id',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  sortOrder: 'sortOrder'
};

exports.Prisma.OccupationDetailScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  profileRegisteredFor: 'profileRegisteredFor',
  status: 'status',
  name: 'name',
  gender: 'gender',
  dateOfBirth: 'dateOfBirth',
  maritalStatus: 'maritalStatus',
  heightCm: 'heightCm',
  weightKg: 'weightKg',
  bodyType: 'bodyType',
  complexion: 'complexion',
  motherTongueId: 'motherTongueId',
  educationCategoryId: 'educationCategoryId',
  educationDetailId: 'educationDetailId',
  occupationCategoryId: 'occupationCategoryId',
  occupationDetailId: 'occupationDetailId',
  annualIncome: 'annualIncome',
  religionId: 'religionId',
  casteId: 'casteId',
  subCasteId: 'subCasteId',
  raasiId: 'raasiId',
  starId: 'starId',
  gotram: 'gotram',
  bornCountryId: 'bornCountryId',
  currentCountryId: 'currentCountryId',
  currentStateId: 'currentStateId',
  currentCityId: 'currentCityId',
  cityOrState: 'cityOrState',
  mainProfilePicture: 'mainProfilePicture',
  aboutMe: 'aboutMe',
  isManglik: 'isManglik',
  profileViewCount: 'profileViewCount',
  isProfileComplete: 'isProfileComplete',
  moderatorNote: 'moderatorNote',
  approvedAt: 'approvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt'
};

exports.Prisma.PhotoScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  photoUrl: 'photoUrl',
  thumbnailUrl: 'thumbnailUrl',
  status: 'status',
  isMain: 'isMain',
  sortOrder: 'sortOrder',
  uploadedAt: 'uploadedAt',
  moderatedAt: 'moderatedAt',
  moderatorId: 'moderatorId'
};

exports.Prisma.ProfileDocumentScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  documentType: 'documentType',
  fileUrl: 'fileUrl',
  fileType: 'fileType',
  status: 'status',
  uploadedAt: 'uploadedAt',
  verifiedAt: 'verifiedAt',
  verifiedById: 'verifiedById'
};

exports.Prisma.LifestyleScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  diet: 'diet',
  drinking: 'drinking',
  smoking: 'smoking',
  physicalActivity: 'physicalActivity',
  hobbies: 'hobbies',
  languages: 'languages'
};

exports.Prisma.FamilyDetailScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  fatherName: 'fatherName',
  fatherOccupation: 'fatherOccupation',
  motherName: 'motherName',
  motherOccupation: 'motherOccupation',
  numBrothers: 'numBrothers',
  numMarriedBrothers: 'numMarriedBrothers',
  numSisters: 'numSisters',
  numMarriedSisters: 'numMarriedSisters',
  familyStatus: 'familyStatus',
  familyValues: 'familyValues',
  familyOriginCity: 'familyOriginCity',
  familyOriginCountryId: 'familyOriginCountryId',
  additionalInfo: 'additionalInfo'
};

exports.Prisma.PartnerPreferenceScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  minAge: 'minAge',
  maxAge: 'maxAge',
  minHeightCm: 'minHeightCm',
  maxHeightCm: 'maxHeightCm',
  maritalStatuses: 'maritalStatuses',
  diet: 'diet',
  smoking: 'smoking',
  drinking: 'drinking',
  incomeMin: 'incomeMin',
  otherNotes: 'otherNotes'
};

exports.Prisma.PartnerPreferenceCasteScalarFieldEnum = {
  preferenceId: 'preferenceId',
  casteId: 'casteId'
};

exports.Prisma.PartnerPreferenceCountryScalarFieldEnum = {
  preferenceId: 'preferenceId',
  countryId: 'countryId'
};

exports.Prisma.InterestScalarFieldEnum = {
  id: 'id',
  senderProfileId: 'senderProfileId',
  receiverProfileId: 'receiverProfileId',
  status: 'status',
  messageNote: 'messageNote',
  respondedAt: 'respondedAt',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FavoriteScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  profileId: 'profileId',
  createdAt: 'createdAt'
};

exports.Prisma.BlockScalarFieldEnum = {
  id: 'id',
  blockerUserId: 'blockerUserId',
  blockedUserId: 'blockedUserId',
  reason: 'reason',
  createdAt: 'createdAt'
};

exports.Prisma.RecentViewScalarFieldEnum = {
  id: 'id',
  viewerUserId: 'viewerUserId',
  viewedProfileId: 'viewedProfileId',
  viewedAt: 'viewedAt'
};

exports.Prisma.CompatibilityScoreScalarFieldEnum = {
  id: 'id',
  profileId: 'profileId',
  targetProfileId: 'targetProfileId',
  overallScore: 'overallScore',
  astroScore: 'astroScore',
  locationScore: 'locationScore',
  cultureScore: 'cultureScore',
  highlights: 'highlights',
  flags: 'flags',
  computedAt: 'computedAt'
};

exports.Prisma.ConversationScalarFieldEnum = {
  id: 'id',
  lastMessageAt: 'lastMessageAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConversationParticipantScalarFieldEnum = {
  conversationId: 'conversationId',
  userId: 'userId',
  joinedAt: 'joinedAt',
  lastReadAt: 'lastReadAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  conversationId: 'conversationId',
  senderId: 'senderId',
  messageText: 'messageText',
  isRead: 'isRead',
  readAt: 'readAt',
  deletedBySender: 'deletedBySender',
  createdAt: 'createdAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  titleEn: 'titleEn',
  titleTa: 'titleTa',
  bodyEn: 'bodyEn',
  bodyTa: 'bodyTa',
  referenceId: 'referenceId',
  isRead: 'isRead',
  readAt: 'readAt',
  createdAt: 'createdAt'
};

exports.Prisma.MembershipPlanScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  price: 'price',
  currency: 'currency',
  durationDays: 'durationDays',
  features: 'features',
  highlightFeatures: 'highlightFeatures',
  maxInterestsDaily: 'maxInterestsDaily',
  maxMessagesDaily: 'maxMessagesDaily',
  canViewContacts: 'canViewContacts',
  canViewHoroscope: 'canViewHoroscope',
  isActive: 'isActive',
  sortOrder: 'sortOrder',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserMembershipScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  planId: 'planId',
  startsAt: 'startsAt',
  endsAt: 'endsAt',
  status: 'status',
  autoRenew: 'autoRenew',
  cancelledAt: 'cancelledAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  membershipId: 'membershipId',
  transactionReference: 'transactionReference',
  gateway: 'gateway',
  gatewayPaymentId: 'gatewayPaymentId',
  amount: 'amount',
  currency: 'currency',
  taxAmount: 'taxAmount',
  paymentMethod: 'paymentMethod',
  status: 'status',
  failureReason: 'failureReason',
  refundedAt: 'refundedAt',
  createdAt: 'createdAt'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  paymentId: 'paymentId',
  invoiceNumber: 'invoiceNumber',
  invoicePdfUrl: 'invoicePdfUrl',
  issuedAt: 'issuedAt'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  reporterUserId: 'reporterUserId',
  reportedProfileId: 'reportedProfileId',
  reason: 'reason',
  description: 'description',
  status: 'status',
  moderatorId: 'moderatorId',
  moderatorNote: 'moderatorNote',
  resolvedAt: 'resolvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupportTicketScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  subject: 'subject',
  category: 'category',
  status: 'status',
  priority: 'priority',
  assignedToId: 'assignedToId',
  resolvedAt: 'resolvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TicketMessageScalarFieldEnum = {
  id: 'id',
  ticketId: 'ticketId',
  senderId: 'senderId',
  body: 'body',
  isStaff: 'isStaff',
  createdAt: 'createdAt'
};

exports.Prisma.BlogPostScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  slug: 'slug',
  titleEn: 'titleEn',
  titleTa: 'titleTa',
  bodyEn: 'bodyEn',
  bodyTa: 'bodyTa',
  metaDescription: 'metaDescription',
  featuredImage: 'featuredImage',
  status: 'status',
  publishedAt: 'publishedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BlogTagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug'
};

exports.Prisma.BlogPostTagScalarFieldEnum = {
  postId: 'postId',
  tagId: 'tagId'
};

exports.Prisma.FaqScalarFieldEnum = {
  id: 'id',
  categoryId: 'categoryId',
  questionEn: 'questionEn',
  questionTa: 'questionTa',
  answerEn: 'answerEn',
  answerTa: 'answerTa',
  sortOrder: 'sortOrder',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuItemScalarFieldEnum = {
  id: 'id',
  parentId: 'parentId',
  titleEn: 'titleEn',
  titleTa: 'titleTa',
  targetUrl: 'targetUrl',
  icon: 'icon',
  displayOrder: 'displayOrder',
  isActive: 'isActive'
};

exports.Prisma.SettingScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  type: 'type',
  description: 'description',
  isPublic: 'isPublic',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  actionType: 'actionType',
  entityType: 'entityType',
  entityId: 'entityId',
  description: 'description',
  oldValue: 'oldValue',
  newValue: 'newValue',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.SecurityEventScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  eventType: 'eventType',
  severity: 'severity',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.AppointmentScalarFieldEnum = {
  id: 'id',
  brokerUserId: 'brokerUserId',
  clientProfileId: 'clientProfileId',
  title: 'title',
  scheduledAt: 'scheduledAt',
  type: 'type',
  status: 'status',
  notes: 'notes',
  meetingLink: 'meetingLink',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  accountType: 'accountType',
  token: 'token',
  otp: 'otp',
  expiresAt: 'expiresAt',
  used: 'used',
  createdAt: 'createdAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.PermissionOrderByRelevanceFieldEnum = {
  name: 'name',
  description: 'description'
};

exports.Prisma.RoleOrderByRelevanceFieldEnum = {
  name: 'name',
  description: 'description'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  username: 'username',
  email: 'email',
  phoneNumber: 'phoneNumber',
  password: 'password',
  uiLanguage: 'uiLanguage'
};

exports.Prisma.SessionOrderByRelevanceFieldEnum = {
  refreshToken: 'refreshToken',
  deviceName: 'deviceName',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent'
};

exports.Prisma.OtpCodeOrderByRelevanceFieldEnum = {
  identifier: 'identifier',
  otpHash: 'otpHash',
  purpose: 'purpose'
};

exports.Prisma.EmailVerificationOrderByRelevanceFieldEnum = {
  email: 'email',
  otp: 'otp'
};

exports.Prisma.BrokerProfileOrderByRelevanceFieldEnum = {
  agencyName: 'agencyName',
  licenseNumber: 'licenseNumber',
  whatsappNumber: 'whatsappNumber',
  country: 'country',
  state: 'state',
  district: 'district',
  officeAddress: 'officeAddress',
  registrationNumber: 'registrationNumber',
  governmentIdUrl: 'governmentIdUrl',
  profilePhotoUrl: 'profilePhotoUrl',
  websiteUrl: 'websiteUrl',
  rejectionReason: 'rejectionReason',
  otpCode: 'otpCode'
};

exports.Prisma.ReligionOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.CasteOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.SubCasteOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.RaasiOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.StarOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.CountryOrderByRelevanceFieldEnum = {
  iso2: 'iso2',
  iso3: 'iso3',
  nameEn: 'nameEn',
  nameTa: 'nameTa',
  dialingCode: 'dialingCode'
};

exports.Prisma.StateOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.CityOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.MotherTongueOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.EducationCategoryOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.EducationDetailOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.OccupationCategoryOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.OccupationDetailOrderByRelevanceFieldEnum = {
  nameEn: 'nameEn',
  nameTa: 'nameTa'
};

exports.Prisma.ProfileOrderByRelevanceFieldEnum = {
  name: 'name',
  gotram: 'gotram',
  cityOrState: 'cityOrState',
  mainProfilePicture: 'mainProfilePicture',
  aboutMe: 'aboutMe',
  moderatorNote: 'moderatorNote'
};

exports.Prisma.PhotoOrderByRelevanceFieldEnum = {
  photoUrl: 'photoUrl',
  thumbnailUrl: 'thumbnailUrl'
};

exports.Prisma.ProfileDocumentOrderByRelevanceFieldEnum = {
  fileUrl: 'fileUrl'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.LifestyleOrderByRelevanceFieldEnum = {
  physicalActivity: 'physicalActivity'
};

exports.Prisma.FamilyDetailOrderByRelevanceFieldEnum = {
  fatherName: 'fatherName',
  fatherOccupation: 'fatherOccupation',
  motherName: 'motherName',
  motherOccupation: 'motherOccupation',
  familyOriginCity: 'familyOriginCity',
  additionalInfo: 'additionalInfo'
};

exports.Prisma.PartnerPreferenceOrderByRelevanceFieldEnum = {
  otherNotes: 'otherNotes'
};

exports.Prisma.InterestOrderByRelevanceFieldEnum = {
  messageNote: 'messageNote'
};

exports.Prisma.BlockOrderByRelevanceFieldEnum = {
  reason: 'reason'
};

exports.Prisma.MessageOrderByRelevanceFieldEnum = {
  messageText: 'messageText'
};

exports.Prisma.NotificationOrderByRelevanceFieldEnum = {
  titleEn: 'titleEn',
  titleTa: 'titleTa',
  bodyEn: 'bodyEn',
  bodyTa: 'bodyTa'
};

exports.Prisma.MembershipPlanOrderByRelevanceFieldEnum = {
  name: 'name',
  slug: 'slug',
  description: 'description',
  currency: 'currency'
};

exports.Prisma.PaymentOrderByRelevanceFieldEnum = {
  transactionReference: 'transactionReference',
  gateway: 'gateway',
  gatewayPaymentId: 'gatewayPaymentId',
  currency: 'currency',
  paymentMethod: 'paymentMethod',
  failureReason: 'failureReason'
};

exports.Prisma.InvoiceOrderByRelevanceFieldEnum = {
  invoiceNumber: 'invoiceNumber',
  invoicePdfUrl: 'invoicePdfUrl'
};

exports.Prisma.ReportOrderByRelevanceFieldEnum = {
  reason: 'reason',
  description: 'description',
  moderatorNote: 'moderatorNote'
};

exports.Prisma.SupportTicketOrderByRelevanceFieldEnum = {
  subject: 'subject',
  category: 'category',
  priority: 'priority'
};

exports.Prisma.TicketMessageOrderByRelevanceFieldEnum = {
  body: 'body'
};

exports.Prisma.BlogPostOrderByRelevanceFieldEnum = {
  slug: 'slug',
  titleEn: 'titleEn',
  titleTa: 'titleTa',
  bodyEn: 'bodyEn',
  bodyTa: 'bodyTa',
  metaDescription: 'metaDescription',
  featuredImage: 'featuredImage'
};

exports.Prisma.BlogTagOrderByRelevanceFieldEnum = {
  name: 'name',
  slug: 'slug'
};

exports.Prisma.FaqOrderByRelevanceFieldEnum = {
  questionEn: 'questionEn',
  questionTa: 'questionTa',
  answerEn: 'answerEn',
  answerTa: 'answerTa'
};

exports.Prisma.MenuItemOrderByRelevanceFieldEnum = {
  titleEn: 'titleEn',
  titleTa: 'titleTa',
  targetUrl: 'targetUrl',
  icon: 'icon'
};

exports.Prisma.SettingOrderByRelevanceFieldEnum = {
  key: 'key',
  value: 'value',
  type: 'type',
  description: 'description'
};

exports.Prisma.AuditLogOrderByRelevanceFieldEnum = {
  actionType: 'actionType',
  entityType: 'entityType',
  description: 'description',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent'
};

exports.Prisma.SecurityEventOrderByRelevanceFieldEnum = {
  eventType: 'eventType',
  severity: 'severity',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  description: 'description'
};

exports.Prisma.AppointmentOrderByRelevanceFieldEnum = {
  title: 'title',
  notes: 'notes',
  meetingLink: 'meetingLink'
};

exports.Prisma.PasswordResetTokenOrderByRelevanceFieldEnum = {
  accountType: 'accountType',
  token: 'token',
  otp: 'otp',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent'
};
exports.AccountType = exports.$Enums.AccountType = {
  individual: 'individual',
  broker: 'broker',
  admin: 'admin',
  moderator: 'moderator'
};

exports.BrokerVerificationStatus = exports.$Enums.BrokerVerificationStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  blocked: 'blocked'
};

exports.ProfileRegisteredFor = exports.$Enums.ProfileRegisteredFor = {
  self: 'self',
  son: 'son',
  daughter: 'daughter',
  brother: 'brother',
  sister: 'sister',
  relative: 'relative',
  friend: 'friend',
  client: 'client'
};

exports.ProfileStatus = exports.$Enums.ProfileStatus = {
  draft: 'draft',
  pending_moderation: 'pending_moderation',
  active: 'active',
  suspended: 'suspended',
  deactivated: 'deactivated',
  archived: 'archived'
};

exports.Gender = exports.$Enums.Gender = {
  M: 'M',
  F: 'F'
};

exports.MaritalStatus = exports.$Enums.MaritalStatus = {
  never_married: 'never_married',
  divorced: 'divorced',
  widowed: 'widowed',
  separated: 'separated',
  annulled: 'annulled'
};

exports.BodyType = exports.$Enums.BodyType = {
  slim: 'slim',
  athletic: 'athletic',
  average: 'average',
  heavy: 'heavy'
};

exports.Complexion = exports.$Enums.Complexion = {
  very_fair: 'very_fair',
  fair: 'fair',
  wheatish: 'wheatish',
  dark: 'dark',
  very_dark: 'very_dark'
};

exports.IncomeRange = exports.$Enums.IncomeRange = {
  below_20k: 'below_20k',
  range_20k_40k: 'range_20k_40k',
  range_40k_60k: 'range_40k_60k',
  range_60k_100k: 'range_60k_100k',
  range_100k_150k: 'range_100k_150k',
  above_150k: 'above_150k'
};

exports.PhotoStatus = exports.$Enums.PhotoStatus = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

exports.DocumentType = exports.$Enums.DocumentType = {
  horoscope: 'horoscope',
  birth_certificate: 'birth_certificate',
  id_proof: 'id_proof'
};

exports.FileType = exports.$Enums.FileType = {
  image: 'image',
  pdf: 'pdf'
};

exports.DocumentStatus = exports.$Enums.DocumentStatus = {
  pending: 'pending',
  verified: 'verified',
  rejected: 'rejected'
};

exports.DietType = exports.$Enums.DietType = {
  vegetarian: 'vegetarian',
  non_vegetarian: 'non_vegetarian',
  vegan: 'vegan',
  eggetarian: 'eggetarian',
  jain: 'jain'
};

exports.DrinkingHabit = exports.$Enums.DrinkingHabit = {
  never: 'never',
  occasionally: 'occasionally',
  regularly: 'regularly'
};

exports.SmokingHabit = exports.$Enums.SmokingHabit = {
  never: 'never',
  occasionally: 'occasionally',
  regularly: 'regularly'
};

exports.FamilyStatus = exports.$Enums.FamilyStatus = {
  rich: 'rich',
  upper_middle_class: 'upper_middle_class',
  middle_class: 'middle_class',
  working_class: 'working_class'
};

exports.FamilyValues = exports.$Enums.FamilyValues = {
  traditional: 'traditional',
  moderate: 'moderate',
  liberal: 'liberal'
};

exports.InterestStatus = exports.$Enums.InterestStatus = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  expired: 'expired',
  withdrawn: 'withdrawn'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  interest_received: 'interest_received',
  interest_accepted: 'interest_accepted',
  interest_rejected: 'interest_rejected',
  new_message: 'new_message',
  profile_viewed: 'profile_viewed',
  payment_success: 'payment_success',
  payment_failed: 'payment_failed',
  membership_expiring: 'membership_expiring',
  photo_approved: 'photo_approved',
  photo_rejected: 'photo_rejected',
  profile_approved: 'profile_approved',
  profile_suspended: 'profile_suspended',
  system_announcement: 'system_announcement'
};

exports.MembershipStatus = exports.$Enums.MembershipStatus = {
  active: 'active',
  expired: 'expired',
  cancelled: 'cancelled',
  paused: 'paused'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed',
  refunded: 'refunded',
  disputed: 'disputed'
};

exports.ReportStatus = exports.$Enums.ReportStatus = {
  pending: 'pending',
  investigating: 'investigating',
  actioned: 'actioned',
  dismissed: 'dismissed'
};

exports.TicketStatus = exports.$Enums.TicketStatus = {
  open: 'open',
  in_progress: 'in_progress',
  waiting_on_user: 'waiting_on_user',
  resolved: 'resolved',
  closed: 'closed'
};

exports.PostStatus = exports.$Enums.PostStatus = {
  draft: 'draft',
  published: 'published',
  archived: 'archived'
};

exports.AppointmentType = exports.$Enums.AppointmentType = {
  video_call: 'video_call',
  phone_call: 'phone_call',
  in_person: 'in_person',
  whatsapp: 'whatsapp'
};

exports.AppointmentStatus = exports.$Enums.AppointmentStatus = {
  upcoming: 'upcoming',
  completed: 'completed',
  cancelled: 'cancelled',
  rescheduled: 'rescheduled',
  pending: 'pending'
};

exports.Prisma.ModelName = {
  Permission: 'Permission',
  Role: 'Role',
  RolePermission: 'RolePermission',
  User: 'User',
  UserRole: 'UserRole',
  Session: 'Session',
  OtpCode: 'OtpCode',
  EmailVerification: 'EmailVerification',
  BrokerProfile: 'BrokerProfile',
  Religion: 'Religion',
  Caste: 'Caste',
  SubCaste: 'SubCaste',
  Raasi: 'Raasi',
  Star: 'Star',
  Country: 'Country',
  State: 'State',
  City: 'City',
  MotherTongue: 'MotherTongue',
  EducationCategory: 'EducationCategory',
  EducationDetail: 'EducationDetail',
  OccupationCategory: 'OccupationCategory',
  OccupationDetail: 'OccupationDetail',
  Profile: 'Profile',
  Photo: 'Photo',
  ProfileDocument: 'ProfileDocument',
  Lifestyle: 'Lifestyle',
  FamilyDetail: 'FamilyDetail',
  PartnerPreference: 'PartnerPreference',
  PartnerPreferenceCaste: 'PartnerPreferenceCaste',
  PartnerPreferenceCountry: 'PartnerPreferenceCountry',
  Interest: 'Interest',
  Favorite: 'Favorite',
  Block: 'Block',
  RecentView: 'RecentView',
  CompatibilityScore: 'CompatibilityScore',
  Conversation: 'Conversation',
  ConversationParticipant: 'ConversationParticipant',
  Message: 'Message',
  Notification: 'Notification',
  MembershipPlan: 'MembershipPlan',
  UserMembership: 'UserMembership',
  Payment: 'Payment',
  Invoice: 'Invoice',
  Report: 'Report',
  SupportTicket: 'SupportTicket',
  TicketMessage: 'TicketMessage',
  BlogPost: 'BlogPost',
  BlogTag: 'BlogTag',
  BlogPostTag: 'BlogPostTag',
  Faq: 'Faq',
  MenuItem: 'MenuItem',
  Setting: 'Setting',
  AuditLog: 'AuditLog',
  SecurityEvent: 'SecurityEvent',
  Appointment: 'Appointment',
  PasswordResetToken: 'PasswordResetToken'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\jathu\\Downloads\\Final_matrimony_website-main\\Final_matrimony_website-main\\backend\\prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.1.x"
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "rhel-openssl-1.0.x"
      },
      {
        "fromEnvVar": null,
        "value": "rhel-openssl-1.1.x"
      },
      {
        "fromEnvVar": null,
        "value": "rhel-openssl-3.0.x"
      }
    ],
    "previewFeatures": [
      "fullTextIndex",
      "fullTextSearch"
    ],
    "sourceFilePath": "C:\\Users\\jathu\\Downloads\\Final_matrimony_website-main\\Final_matrimony_website-main\\database\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null
  },
  "relativePath": "../../database/prisma",
  "clientVersion": "5.22.0",
  "engineVersion": "605197351a3c8bdd595af2d2a9bc3025bca48ea2",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// =============================================================================\n// MUKURTHAM MATRIMONY — ENTERPRISE DATABASE SCHEMA\n// Version: 2.0.0\n// Author: Principal Database Architecture Team\n// Designed for: Sri Lankan Tamil & Global Tamil Diaspora\n// Scale Target: 10,000,000+ users\n// =============================================================================\n\ndatasource db {\n  provider = \"mysql\"\n  url      = env(\"DATABASE_URL\")\n}\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"fullTextSearch\", \"fullTextIndex\"]\n  binaryTargets   = [\"native\", \"debian-openssl-1.0.x\", \"debian-openssl-1.1.x\", \"debian-openssl-3.0.x\", \"rhel-openssl-1.0.x\", \"rhel-openssl-1.1.x\", \"rhel-openssl-3.0.x\"]\n  output          = \"../../backend/prisma-client\"\n}\n\n// =============================================================================\n// SECTION 1: ENUMERATIONS\n// =============================================================================\n\nenum ProfileRegisteredFor {\n  self\n  son\n  daughter\n  brother\n  sister\n  relative\n  friend\n  client\n}\n\nenum Gender {\n  M\n  F\n}\n\nenum MaritalStatus {\n  never_married\n  divorced\n  widowed\n  separated\n  annulled\n}\n\nenum ProfileStatus {\n  draft\n  pending_moderation\n  active\n  suspended\n  deactivated\n  archived\n}\n\nenum PhotoStatus {\n  pending\n  approved\n  rejected\n}\n\nenum FileType {\n  image\n  pdf\n}\n\nenum DocumentType {\n  horoscope\n  birth_certificate\n  id_proof\n}\n\nenum DocumentStatus {\n  pending\n  verified\n  rejected\n}\n\nenum InterestStatus {\n  pending\n  accepted\n  rejected\n  expired\n  withdrawn\n}\n\nenum MembershipStatus {\n  active\n  expired\n  cancelled\n  paused\n}\n\nenum PaymentStatus {\n  pending\n  succeeded\n  failed\n  refunded\n  disputed\n}\n\nenum NotificationType {\n  interest_received\n  interest_accepted\n  interest_rejected\n  new_message\n  profile_viewed\n  payment_success\n  payment_failed\n  membership_expiring\n  photo_approved\n  photo_rejected\n  profile_approved\n  profile_suspended\n  system_announcement\n}\n\nenum ReportStatus {\n  pending\n  investigating\n  actioned\n  dismissed\n}\n\nenum TicketStatus {\n  open\n  in_progress\n  waiting_on_user\n  resolved\n  closed\n}\n\nenum PostStatus {\n  draft\n  published\n  archived\n}\n\nenum DietType {\n  vegetarian\n  non_vegetarian\n  vegan\n  eggetarian\n  jain\n}\n\nenum DrinkingHabit {\n  never\n  occasionally\n  regularly\n}\n\nenum SmokingHabit {\n  never\n  occasionally\n  regularly\n}\n\nenum BodyType {\n  slim\n  athletic\n  average\n  heavy\n}\n\nenum Complexion {\n  very_fair\n  fair\n  wheatish\n  dark\n  very_dark\n}\n\nenum IncomeRange {\n  below_20k\n  range_20k_40k\n  range_40k_60k\n  range_60k_100k\n  range_100k_150k\n  above_150k\n}\n\nenum FamilyStatus {\n  rich\n  upper_middle_class\n  middle_class\n  working_class\n}\n\nenum FamilyValues {\n  traditional\n  moderate\n  liberal\n}\n\nenum AccountType {\n  individual\n  broker\n  admin\n  moderator\n}\n\n// =============================================================================\n// SECTION 2: RBAC — PERMISSIONS, ROLES\n// =============================================================================\n\nmodel Permission {\n  id          Int              @id @default(autoincrement())\n  name        String           @unique @db.VarChar(100)\n  description String?          @db.VarChar(255)\n  createdAt   DateTime         @default(now()) @map(\"created_at\")\n  roles       RolePermission[]\n\n  @@map(\"permissions\")\n}\n\nmodel Role {\n  id          Int              @id @default(autoincrement())\n  name        String           @unique @db.VarChar(50)\n  description String?          @db.VarChar(255)\n  isSystem    Boolean          @default(false) @map(\"is_system\")\n  createdAt   DateTime         @default(now()) @map(\"created_at\")\n  updatedAt   DateTime         @updatedAt @map(\"updated_at\")\n  users       UserRole[]\n  permissions RolePermission[]\n\n  @@map(\"roles\")\n}\n\nmodel RolePermission {\n  roleId       Int        @map(\"role_id\")\n  permissionId Int        @map(\"permission_id\")\n  role         Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)\n  permission   Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)\n\n  @@id([roleId, permissionId])\n  @@map(\"role_permissions\")\n}\n\n// =============================================================================\n// SECTION 3: AUTHENTICATION & ACCOUNT DOMAIN\n// =============================================================================\n\nmodel User {\n  id                 Int                       @id @default(autoincrement())\n  username           String                    @unique @db.VarChar(255)\n  email              String                    @unique @db.VarChar(255)\n  phoneNumber        String                    @unique @map(\"phone_number\") @db.VarChar(20)\n  password           String                    @db.VarChar(255)\n  accountType        AccountType               @default(individual) @map(\"account_type\")\n  isEmailVerified    Boolean                   @default(true) @map(\"is_email_verified\")\n  isPhoneVerified    Boolean                   @default(true) @map(\"is_phone_verified\")\n  isApproved         Boolean                   @default(true) @map(\"is_approved\")\n  isSuspended        Boolean                   @default(false) @map(\"is_suspended\")\n  uiLanguage         String                    @default(\"en\") @map(\"ui_language\") @db.VarChar(5)\n  lastLoginAt        DateTime?                 @map(\"last_login_at\")\n  createdAt          DateTime                  @default(now()) @map(\"created_at\")\n  updatedAt          DateTime                  @updatedAt @map(\"updated_at\")\n  deletedAt          DateTime?                 @map(\"deleted_at\")\n  roles              UserRole[]\n  sessions           Session[]\n  profiles           Profile[]\n  memberships        UserMembership[]\n  payments           Payment[]\n  favorites          Favorite[]                @relation(\"UserFavorites\")\n  blocksInitiated    Block[]                   @relation(\"BlockerUser\")\n  blocksReceived     Block[]                   @relation(\"BlockedUser\")\n  viewsMade          RecentView[]              @relation(\"ViewerUser\")\n  sentMessages       Message[]                 @relation(\"MessageSender\")\n  notifications      Notification[]\n  reportsSubmitted   Report[]                  @relation(\"ReportReporter\")\n  auditLogs          AuditLog[]\n  conversationParts  ConversationParticipant[]\n  supportTickets     SupportTicket[]           @relation(\"TicketOwner\")\n  ticketMessages     TicketMessage[]\n  brokerProfile      BrokerProfile?\n  brokerAppointments Appointment[]             @relation(\"BrokerAppointments\")\n\n  @@index([email])\n  @@index([phoneNumber])\n  @@index([accountType])\n  @@index([createdAt])\n  @@map(\"users\")\n}\n\nmodel UserRole {\n  userId    Int      @map(\"user_id\")\n  roleId    Int      @map(\"role_id\")\n  grantedAt DateTime @default(now()) @map(\"granted_at\")\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  role      Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)\n\n  @@id([userId, roleId])\n  @@map(\"user_roles\")\n}\n\nmodel Session {\n  id           Int      @id @default(autoincrement())\n  userId       Int      @map(\"user_id\")\n  refreshToken String   @unique @map(\"refresh_token\") @db.VarChar(512)\n  deviceName   String?  @map(\"device_name\") @db.VarChar(100)\n  ipAddress    String?  @map(\"ip_address\") @db.VarChar(45)\n  userAgent    String?  @map(\"user_agent\") @db.VarChar(500)\n  isRevoked    Boolean  @default(false) @map(\"is_revoked\")\n  expiresAt    DateTime @map(\"expires_at\")\n  createdAt    DateTime @default(now()) @map(\"created_at\")\n  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([refreshToken])\n  @@index([expiresAt])\n  @@map(\"sessions\")\n}\n\nmodel OtpCode {\n  id           Int       @id @default(autoincrement())\n  identifier   String    @db.VarChar(255)\n  otpHash      String    @map(\"otp_hash\") @db.VarChar(255)\n  purpose      String    @db.VarChar(50)\n  attemptCount Int       @default(0) @map(\"attempt_count\")\n  expiresAt    DateTime  @map(\"expires_at\")\n  usedAt       DateTime? @map(\"used_at\")\n  createdAt    DateTime  @default(now()) @map(\"created_at\")\n\n  @@index([identifier])\n  @@index([expiresAt])\n  @@map(\"otp_codes\")\n}\n\nmodel EmailVerification {\n  id        Int      @id @default(autoincrement())\n  email     String   @db.VarChar(255)\n  otp       String   @db.VarChar(255) // Hashed OTP\n  expiresAt DateTime @map(\"expires_at\")\n  verified  Boolean  @default(false)\n  createdAt DateTime @default(now()) @map(\"created_at\")\n\n  @@index([email])\n  @@index([expiresAt])\n  @@map(\"email_verifications\")\n}\n\n// =============================================================================\n// SECTION 4: BROKER DOMAIN\n// =============================================================================\n\nenum BrokerVerificationStatus {\n  pending\n  approved\n  rejected\n  blocked\n}\n\nmodel BrokerProfile {\n  id                    Int                      @id @default(autoincrement())\n  userId                Int                      @unique @map(\"user_id\")\n  agencyName            String?                  @map(\"agency_name\") @db.VarChar(200)\n  licenseNumber         String?                  @map(\"license_number\") @db.VarChar(100)\n  isVerified            Boolean                  @default(false) @map(\"is_verified\")\n  maxProfileQuota       Int                      @default(10) @map(\"max_profile_quota\")\n  // Extended CRM fields\n  whatsappNumber        String?                  @map(\"whatsapp_number\") @db.VarChar(20)\n  country               String?                  @map(\"country\") @db.VarChar(100)\n  state                 String?                  @map(\"state\") @db.VarChar(100)\n  district              String?                  @map(\"district\") @db.VarChar(100)\n  officeAddress         String?                  @map(\"office_address\") @db.VarChar(500)\n  yearsOfExperience     Int?                     @map(\"years_of_experience\")\n  numberOfActiveClients Int?                     @map(\"number_of_active_clients\")\n  registrationNumber    String?                  @map(\"registration_number\") @db.VarChar(100)\n  governmentIdUrl       String?                  @map(\"government_id_url\") @db.VarChar(500)\n  profilePhotoUrl       String?                  @map(\"profile_photo_url\") @db.VarChar(500)\n  websiteUrl            String?                  @map(\"website_url\") @db.VarChar(300)\n  verificationStatus    BrokerVerificationStatus @default(pending) @map(\"verification_status\")\n  rejectionReason       String?                  @map(\"rejection_reason\") @db.Text\n  approvedAt            DateTime?                @map(\"approved_at\")\n  // OTP\n  otpCode               String?                  @map(\"otp_code\") @db.VarChar(6)\n  otpExpiresAt          DateTime?                @map(\"otp_expires_at\")\n  isEmailVerified       Boolean                  @default(false) @map(\"is_email_verified\")\n  createdAt             DateTime                 @default(now()) @map(\"created_at\")\n  updatedAt             DateTime                 @updatedAt @map(\"updated_at\")\n  user                  User                     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([verificationStatus])\n  @@map(\"broker_profiles\")\n}\n\n// =============================================================================\n// SECTION 5: LOOKUP / MASTER REFERENCE TABLES\n// =============================================================================\n\nmodel Religion {\n  id        Int       @id @default(autoincrement())\n  nameEn    String    @unique @map(\"name_en\") @db.VarChar(100)\n  nameTa    String    @map(\"name_ta\") @db.VarChar(100)\n  sortOrder Int       @default(999) @map(\"sort_order\")\n  isActive  Boolean   @default(true) @map(\"is_active\")\n  castes    Caste[]\n  profiles  Profile[]\n\n  @@map(\"religions\")\n}\n\nmodel Caste {\n  id                      Int                      @id @default(autoincrement())\n  religionId              Int                      @map(\"religion_id\")\n  nameEn                  String                   @map(\"name_en\") @db.VarChar(100)\n  nameTa                  String                   @map(\"name_ta\") @db.VarChar(100)\n  sortOrder               Int                      @default(999) @map(\"sort_order\")\n  isActive                Boolean                  @default(true) @map(\"is_active\")\n  religion                Religion                 @relation(fields: [religionId], references: [id])\n  subCastes               SubCaste[]\n  profiles                Profile[]\n  partnerPreferenceCastes PartnerPreferenceCaste[]\n\n  @@unique([religionId, nameEn])\n  @@map(\"castes\")\n}\n\nmodel SubCaste {\n  id       Int       @id @default(autoincrement())\n  casteId  Int       @map(\"caste_id\")\n  nameEn   String    @map(\"name_en\") @db.VarChar(100)\n  nameTa   String    @map(\"name_ta\") @db.VarChar(100)\n  isActive Boolean   @default(true) @map(\"is_active\")\n  caste    Caste     @relation(fields: [casteId], references: [id])\n  profiles Profile[]\n\n  @@unique([casteId, nameEn])\n  @@map(\"sub_castes\")\n}\n\nmodel Raasi {\n  id          Int       @id @default(autoincrement())\n  nameEn      String    @unique @map(\"name_en\") @db.VarChar(100)\n  nameTa      String    @map(\"name_ta\") @db.VarChar(100)\n  numeralCode Int       @unique @map(\"numeral_code\")\n  profiles    Profile[]\n\n  @@map(\"raasis\")\n}\n\nmodel Star {\n  id          Int       @id @default(autoincrement())\n  nameEn      String    @unique @map(\"name_en\") @db.VarChar(100)\n  nameTa      String    @map(\"name_ta\") @db.VarChar(100)\n  numeralCode Int       @unique @map(\"numeral_code\")\n  raasiId     Int?      @map(\"raasi_id\")\n  profiles    Profile[]\n\n  @@map(\"stars\")\n}\n\nmodel Country {\n  id                  Int                        @id @default(autoincrement())\n  iso2                String                     @unique @map(\"iso2\") @db.VarChar(2)\n  iso3                String                     @unique @map(\"iso3\") @db.VarChar(3)\n  nameEn              String                     @db.VarChar(100)\n  nameTa              String?                    @map(\"name_ta\") @db.VarChar(100)\n  dialingCode         String?                    @map(\"dialing_code\") @db.VarChar(10)\n  priority            Int                        @default(999)\n  isActive            Boolean                    @default(true) @map(\"is_active\")\n  bornProfiles        Profile[]                  @relation(\"ProfileBornCountry\")\n  currentProfiles     Profile[]                  @relation(\"ProfileCurrentCountry\")\n  states              State[]\n  preferredByProfiles PartnerPreferenceCountry[]\n\n  @@map(\"countries\")\n}\n\nmodel State {\n  id              Int       @id @default(autoincrement())\n  countryId       Int       @map(\"country_id\")\n  nameEn          String    @db.VarChar(100)\n  nameTa          String?   @map(\"name_ta\") @db.VarChar(100)\n  country         Country   @relation(fields: [countryId], references: [id])\n  cities          City[]\n  profilesCurrent Profile[] @relation(\"ProfileCurrentState\")\n\n  @@index([countryId])\n  @@map(\"states\")\n}\n\nmodel City {\n  id              Int       @id @default(autoincrement())\n  stateId         Int       @map(\"state_id\")\n  nameEn          String    @db.VarChar(100)\n  nameTa          String?   @map(\"name_ta\") @db.VarChar(100)\n  state           State     @relation(fields: [stateId], references: [id])\n  profilesCurrent Profile[] @relation(\"ProfileCurrentCity\")\n\n  @@index([stateId])\n  @@map(\"cities\")\n}\n\nmodel MotherTongue {\n  id       Int       @id @default(autoincrement())\n  nameEn   String    @unique @map(\"name_en\") @db.VarChar(100)\n  nameTa   String    @map(\"name_ta\") @db.VarChar(100)\n  profiles Profile[]\n\n  @@map(\"mother_tongues\")\n}\n\nmodel EducationCategory {\n  id        Int               @id @default(autoincrement())\n  nameEn    String            @unique @map(\"name_en\") @db.VarChar(100)\n  nameTa    String            @map(\"name_ta\") @db.VarChar(100)\n  sortOrder Int               @default(999) @map(\"sort_order\")\n  details   EducationDetail[]\n  profiles  Profile[]\n\n  @@map(\"education_categories\")\n}\n\nmodel EducationDetail {\n  id         Int               @id @default(autoincrement())\n  categoryId Int               @map(\"category_id\")\n  nameEn     String            @map(\"name_en\") @db.VarChar(200)\n  nameTa     String            @map(\"name_ta\") @db.VarChar(200)\n  category   EducationCategory @relation(fields: [categoryId], references: [id])\n  profiles   Profile[]\n\n  @@map(\"education_details\")\n}\n\nmodel OccupationCategory {\n  id        Int                @id @default(autoincrement())\n  nameEn    String             @unique @map(\"name_en\") @db.VarChar(100)\n  nameTa    String             @map(\"name_ta\") @db.VarChar(100)\n  sortOrder Int                @default(999) @map(\"sort_order\")\n  details   OccupationDetail[]\n  profiles  Profile[]\n\n  @@map(\"occupation_categories\")\n}\n\nmodel OccupationDetail {\n  id         Int                @id @default(autoincrement())\n  categoryId Int                @map(\"category_id\")\n  nameEn     String             @map(\"name_en\") @db.VarChar(200)\n  nameTa     String             @map(\"name_ta\") @db.VarChar(200)\n  category   OccupationCategory @relation(fields: [categoryId], references: [id])\n  profiles   Profile[]\n\n  @@map(\"occupation_details\")\n}\n\n// =============================================================================\n// SECTION 6: MATRIMONY PROFILE DOMAIN\n// =============================================================================\n\nmodel Profile {\n  id                   Int                  @id @default(autoincrement())\n  userId               Int                  @map(\"user_id\")\n  profileRegisteredFor ProfileRegisteredFor @map(\"profile_registered_for\")\n  status               ProfileStatus        @default(draft)\n  name                 String               @db.VarChar(100)\n  gender               Gender\n  dateOfBirth          DateTime             @map(\"date_of_birth\") @db.Date\n  maritalStatus        MaritalStatus        @default(never_married) @map(\"marital_status\")\n  heightCm             Int                  @map(\"height_cm\")\n  weightKg             Int?                 @map(\"weight_kg\")\n  bodyType             BodyType?            @map(\"body_type\")\n  complexion           Complexion?\n  motherTongueId       Int?                 @map(\"mother_tongue_id\")\n  educationCategoryId  Int?                 @map(\"education_category_id\")\n  educationDetailId    Int?                 @map(\"education_detail_id\")\n  occupationCategoryId Int?                 @map(\"occupation_category_id\")\n  occupationDetailId   Int?                 @map(\"occupation_detail_id\")\n  annualIncome         IncomeRange?         @map(\"annual_income\")\n  religionId           Int                  @map(\"religion_id\")\n  casteId              Int                  @map(\"caste_id\")\n  subCasteId           Int?                 @map(\"sub_caste_id\")\n  raasiId              Int                  @map(\"raasi_id\")\n  starId               Int                  @map(\"star_id\")\n  gotram               String?              @db.VarChar(100)\n  bornCountryId        Int                  @map(\"born_country_id\")\n  currentCountryId     Int                  @map(\"current_country_id\")\n  currentStateId       Int?                 @map(\"current_state_id\")\n  currentCityId        Int?                 @map(\"current_city_id\")\n  cityOrState          String               @map(\"city_or_state\") @db.VarChar(100)\n  mainProfilePicture   String?              @map(\"main_profile_picture\") @db.VarChar(500)\n  aboutMe              String               @map(\"about_me\") @db.Text\n  isManglik            Boolean?             @map(\"is_manglik\")\n  profileViewCount     Int                  @default(0) @map(\"profile_view_count\")\n  isProfileComplete    Boolean              @default(false) @map(\"is_profile_complete\")\n  moderatorNote        String?              @map(\"moderator_note\") @db.Text\n  approvedAt           DateTime?            @map(\"approved_at\")\n  createdAt            DateTime             @default(now()) @map(\"created_at\")\n  updatedAt            DateTime             @updatedAt @map(\"updated_at\")\n  deletedAt            DateTime?            @map(\"deleted_at\")\n  user                 User                 @relation(fields: [userId], references: [id], onDelete: Restrict)\n  religion             Religion             @relation(fields: [religionId], references: [id])\n  caste                Caste                @relation(fields: [casteId], references: [id])\n  subCaste             SubCaste?            @relation(fields: [subCasteId], references: [id])\n  raasi                Raasi                @relation(fields: [raasiId], references: [id])\n  star                 Star                 @relation(fields: [starId], references: [id])\n  motherTongue         MotherTongue?        @relation(fields: [motherTongueId], references: [id])\n  educationCategory    EducationCategory?   @relation(fields: [educationCategoryId], references: [id])\n  educationDetail      EducationDetail?     @relation(fields: [educationDetailId], references: [id])\n  occupationCategory   OccupationCategory?  @relation(fields: [occupationCategoryId], references: [id])\n  occupationDetail     OccupationDetail?    @relation(fields: [occupationDetailId], references: [id])\n  bornCountry          Country              @relation(\"ProfileBornCountry\", fields: [bornCountryId], references: [id])\n  currentCountry       Country              @relation(\"ProfileCurrentCountry\", fields: [currentCountryId], references: [id])\n  currentState         State?               @relation(\"ProfileCurrentState\", fields: [currentStateId], references: [id])\n  currentCity          City?                @relation(\"ProfileCurrentCity\", fields: [currentCityId], references: [id])\n  photos               Photo[]\n  documents            ProfileDocument[]\n  lifestyle            Lifestyle?\n  familyDetail         FamilyDetail?\n  partnerPreference    PartnerPreference?\n  favoritedBy          Favorite[]\n  recentViews          RecentView[]\n  interestsSent        Interest[]           @relation(\"InterestSender\")\n  interestsReceived    Interest[]           @relation(\"InterestReceiver\")\n  reportsAgainst       Report[]             @relation(\"ReportTarget\")\n  compatibilityScores  CompatibilityScore[] @relation(\"ScoreProfile\")\n  clientAppointments   Appointment[]        @relation(\"ClientAppointments\")\n\n  @@index([gender, religionId, casteId, currentCountryId, status])\n  @@index([raasiId, starId])\n  @@index([dateOfBirth])\n  @@index([heightCm])\n  @@index([maritalStatus])\n  @@index([educationCategoryId])\n  @@index([annualIncome])\n  @@index([userId])\n  @@index([status])\n  @@index([deletedAt])\n  @@fulltext([name, aboutMe])\n  @@map(\"profiles\")\n}\n\nmodel Photo {\n  id           Int         @id @default(autoincrement())\n  profileId    Int         @map(\"profile_id\")\n  photoUrl     String      @map(\"photo_url\") @db.VarChar(500)\n  thumbnailUrl String?     @map(\"thumbnail_url\") @db.VarChar(500)\n  status       PhotoStatus @default(pending)\n  isMain       Boolean     @default(false) @map(\"is_main\")\n  sortOrder    Int         @default(0) @map(\"sort_order\")\n  uploadedAt   DateTime    @default(now()) @map(\"uploaded_at\")\n  moderatedAt  DateTime?   @map(\"moderated_at\")\n  moderatorId  Int?        @map(\"moderator_id\")\n  profile      Profile     @relation(fields: [profileId], references: [id], onDelete: Cascade)\n\n  @@index([profileId, status])\n  @@map(\"photos\")\n}\n\nmodel ProfileDocument {\n  id           Int            @id @default(autoincrement())\n  profileId    Int            @map(\"profile_id\")\n  documentType DocumentType   @map(\"document_type\")\n  fileUrl      String         @map(\"file_url\") @db.VarChar(500)\n  fileType     FileType       @map(\"file_type\")\n  status       DocumentStatus @default(pending)\n  uploadedAt   DateTime       @default(now()) @map(\"uploaded_at\")\n  verifiedAt   DateTime?      @map(\"verified_at\")\n  verifiedById Int?           @map(\"verified_by_id\")\n  profile      Profile        @relation(fields: [profileId], references: [id], onDelete: Cascade)\n\n  @@index([profileId])\n  @@index([status])\n  @@map(\"profile_documents\")\n}\n\nmodel Lifestyle {\n  id               Int            @id @default(autoincrement())\n  profileId        Int            @unique @map(\"profile_id\")\n  diet             DietType?\n  drinking         DrinkingHabit?\n  smoking          SmokingHabit?\n  physicalActivity String?        @map(\"physical_activity\") @db.VarChar(100)\n  hobbies          Json?\n  languages        Json?\n  profile          Profile        @relation(fields: [profileId], references: [id], onDelete: Cascade)\n\n  @@map(\"lifestyles\")\n}\n\nmodel FamilyDetail {\n  id                    Int           @id @default(autoincrement())\n  profileId             Int           @unique @map(\"profile_id\")\n  fatherName            String?       @map(\"father_name\") @db.VarChar(100)\n  fatherOccupation      String?       @map(\"father_occupation\") @db.VarChar(150)\n  motherName            String?       @map(\"mother_name\") @db.VarChar(100)\n  motherOccupation      String?       @map(\"mother_occupation\") @db.VarChar(150)\n  numBrothers           Int?          @map(\"num_brothers\")\n  numMarriedBrothers    Int?          @map(\"num_married_brothers\")\n  numSisters            Int?          @map(\"num_sisters\")\n  numMarriedSisters     Int?          @map(\"num_married_sisters\")\n  familyStatus          FamilyStatus? @map(\"family_status\")\n  familyValues          FamilyValues? @map(\"family_values\")\n  familyOriginCity      String?       @map(\"family_origin_city\") @db.VarChar(100)\n  familyOriginCountryId Int?          @map(\"family_origin_country_id\")\n  additionalInfo        String?       @map(\"additional_info\") @db.Text\n  profile               Profile       @relation(fields: [profileId], references: [id], onDelete: Cascade)\n\n  @@map(\"family_details\")\n}\n\n// =============================================================================\n// SECTION 7: PARTNER PREFERENCE DOMAIN\n// =============================================================================\n\nmodel PartnerPreference {\n  id                 Int                        @id @default(autoincrement())\n  profileId          Int                        @unique @map(\"profile_id\")\n  minAge             Int?                       @map(\"min_age\")\n  maxAge             Int?                       @map(\"max_age\")\n  minHeightCm        Int?                       @map(\"min_height_cm\")\n  maxHeightCm        Int?                       @map(\"max_height_cm\")\n  maritalStatuses    Json?                      @map(\"marital_statuses\")\n  diet               DietType?\n  smoking            SmokingHabit?\n  drinking           DrinkingHabit?\n  incomeMin          IncomeRange?               @map(\"income_min\")\n  otherNotes         String?                    @map(\"other_notes\") @db.Text\n  profile            Profile                    @relation(fields: [profileId], references: [id], onDelete: Cascade)\n  preferredCastes    PartnerPreferenceCaste[]\n  preferredCountries PartnerPreferenceCountry[]\n\n  @@map(\"partner_preferences\")\n}\n\nmodel PartnerPreferenceCaste {\n  preferenceId Int               @map(\"preference_id\")\n  casteId      Int               @map(\"caste_id\")\n  preference   PartnerPreference @relation(fields: [preferenceId], references: [id], onDelete: Cascade)\n  caste        Caste             @relation(fields: [casteId], references: [id])\n\n  @@id([preferenceId, casteId])\n  @@map(\"partner_preference_castes\")\n}\n\nmodel PartnerPreferenceCountry {\n  preferenceId Int               @map(\"preference_id\")\n  countryId    Int               @map(\"country_id\")\n  preference   PartnerPreference @relation(fields: [preferenceId], references: [id], onDelete: Cascade)\n  country      Country           @relation(fields: [countryId], references: [id])\n\n  @@id([preferenceId, countryId])\n  @@map(\"partner_preference_countries\")\n}\n\n// =============================================================================\n// SECTION 8: ENGAGEMENT DOMAIN\n// =============================================================================\n\nmodel Interest {\n  id                Int            @id @default(autoincrement())\n  senderProfileId   Int            @map(\"sender_profile_id\")\n  receiverProfileId Int            @map(\"receiver_profile_id\")\n  status            InterestStatus @default(pending)\n  messageNote       String?        @map(\"message_note\") @db.VarChar(500)\n  respondedAt       DateTime?      @map(\"responded_at\")\n  expiresAt         DateTime?      @map(\"expires_at\")\n  createdAt         DateTime       @default(now()) @map(\"created_at\")\n  updatedAt         DateTime       @updatedAt @map(\"updated_at\")\n  senderProfile     Profile        @relation(\"InterestSender\", fields: [senderProfileId], references: [id], onDelete: Cascade)\n  receiverProfile   Profile        @relation(\"InterestReceiver\", fields: [receiverProfileId], references: [id], onDelete: Cascade)\n\n  @@unique([senderProfileId, receiverProfileId])\n  @@index([receiverProfileId, status])\n  @@index([senderProfileId, status])\n  @@map(\"interests\")\n}\n\nmodel Favorite {\n  id        Int      @id @default(autoincrement())\n  userId    Int      @map(\"user_id\")\n  profileId Int      @map(\"profile_id\")\n  createdAt DateTime @default(now()) @map(\"created_at\")\n  user      User     @relation(\"UserFavorites\", fields: [userId], references: [id], onDelete: Cascade)\n  profile   Profile  @relation(fields: [profileId], references: [id], onDelete: Cascade)\n\n  @@unique([userId, profileId])\n  @@index([userId])\n  @@map(\"favorites\")\n}\n\nmodel Block {\n  id            Int      @id @default(autoincrement())\n  blockerUserId Int      @map(\"blocker_user_id\")\n  blockedUserId Int      @map(\"blocked_user_id\")\n  reason        String?  @db.VarChar(255)\n  createdAt     DateTime @default(now()) @map(\"created_at\")\n  blocker       User     @relation(\"BlockerUser\", fields: [blockerUserId], references: [id], onDelete: Cascade)\n  blocked       User     @relation(\"BlockedUser\", fields: [blockedUserId], references: [id], onDelete: Cascade)\n\n  @@unique([blockerUserId, blockedUserId])\n  @@index([blockerUserId])\n  @@map(\"blocks\")\n}\n\nmodel RecentView {\n  id              Int      @id @default(autoincrement())\n  viewerUserId    Int      @map(\"viewer_user_id\")\n  viewedProfileId Int      @map(\"viewed_profile_id\")\n  viewedAt        DateTime @default(now()) @map(\"viewed_at\")\n  viewer          User     @relation(\"ViewerUser\", fields: [viewerUserId], references: [id], onDelete: Cascade)\n  viewedProfile   Profile  @relation(fields: [viewedProfileId], references: [id], onDelete: Cascade)\n\n  @@index([viewedProfileId])\n  @@index([viewerUserId])\n  @@index([viewedAt])\n  @@map(\"recent_views\")\n}\n\n// =============================================================================\n// SECTION 9: AI COMPATIBILITY SCORING\n// =============================================================================\n\nmodel CompatibilityScore {\n  id              Int      @id @default(autoincrement())\n  profileId       Int      @map(\"profile_id\")\n  targetProfileId Int      @map(\"target_profile_id\")\n  overallScore    Int      @map(\"overall_score\")\n  astroScore      Int?     @map(\"astro_score\")\n  locationScore   Int?     @map(\"location_score\")\n  cultureScore    Int?     @map(\"culture_score\")\n  highlights      Json?\n  flags           Json?\n  computedAt      DateTime @default(now()) @map(\"computed_at\")\n  profile         Profile  @relation(\"ScoreProfile\", fields: [profileId], references: [id], onDelete: Cascade)\n\n  @@unique([profileId, targetProfileId])\n  @@index([profileId, overallScore])\n  @@map(\"compatibility_scores\")\n}\n\n// =============================================================================\n// SECTION 10: COMMUNICATION DOMAIN\n// =============================================================================\n\nmodel Conversation {\n  id            Int                       @id @default(autoincrement())\n  lastMessageAt DateTime?                 @map(\"last_message_at\")\n  createdAt     DateTime                  @default(now()) @map(\"created_at\")\n  updatedAt     DateTime                  @updatedAt @map(\"updated_at\")\n  messages      Message[]\n  participants  ConversationParticipant[]\n\n  @@index([lastMessageAt])\n  @@map(\"conversations\")\n}\n\nmodel ConversationParticipant {\n  conversationId Int          @map(\"conversation_id\")\n  userId         Int          @map(\"user_id\")\n  joinedAt       DateTime     @default(now()) @map(\"joined_at\")\n  lastReadAt     DateTime?    @map(\"last_read_at\")\n  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)\n  user           User         @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@id([conversationId, userId])\n  @@index([userId])\n  @@map(\"conversation_participants\")\n}\n\nmodel Message {\n  id              Int          @id @default(autoincrement())\n  conversationId  Int          @map(\"conversation_id\")\n  senderId        Int          @map(\"sender_id\")\n  messageText     String       @map(\"message_text\") @db.Text\n  isRead          Boolean      @default(false) @map(\"is_read\")\n  readAt          DateTime?    @map(\"read_at\")\n  deletedBySender Boolean      @default(false) @map(\"deleted_by_sender\")\n  createdAt       DateTime     @default(now()) @map(\"created_at\")\n  conversation    Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)\n  sender          User         @relation(\"MessageSender\", fields: [senderId], references: [id], onDelete: Cascade)\n\n  @@index([conversationId, createdAt])\n  @@index([senderId])\n  @@map(\"messages\")\n}\n\n// =============================================================================\n// SECTION 11: NOTIFICATION DOMAIN\n// =============================================================================\n\nmodel Notification {\n  id          Int              @id @default(autoincrement())\n  userId      Int              @map(\"user_id\")\n  type        NotificationType\n  titleEn     String           @map(\"title_en\") @db.VarChar(200)\n  titleTa     String?          @map(\"title_ta\") @db.VarChar(200)\n  bodyEn      String           @map(\"body_en\") @db.Text\n  bodyTa      String?          @map(\"body_ta\") @db.Text\n  referenceId Int?             @map(\"reference_id\")\n  isRead      Boolean          @default(false) @map(\"is_read\")\n  readAt      DateTime?        @map(\"read_at\")\n  createdAt   DateTime         @default(now()) @map(\"created_at\")\n  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId, isRead])\n  @@index([userId, createdAt])\n  @@map(\"notifications\")\n}\n\n// =============================================================================\n// SECTION 12: FINANCIAL DOMAIN\n// =============================================================================\n\nmodel MembershipPlan {\n  id                Int              @id @default(autoincrement())\n  name              String           @db.VarChar(100)\n  slug              String           @unique @db.VarChar(100)\n  description       String?          @db.Text\n  price             Decimal          @db.Decimal(10, 2)\n  currency          String           @default(\"CAD\") @db.VarChar(3)\n  durationDays      Int              @map(\"duration_days\")\n  features          Json\n  highlightFeatures Json?            @map(\"highlight_features\")\n  maxInterestsDaily Int?             @map(\"max_interests_daily\")\n  maxMessagesDaily  Int?             @map(\"max_messages_daily\")\n  canViewContacts   Boolean          @default(false) @map(\"can_view_contacts\")\n  canViewHoroscope  Boolean          @default(false) @map(\"can_view_horoscope\")\n  isActive          Boolean          @default(true) @map(\"is_active\")\n  sortOrder         Int              @default(999) @map(\"sort_order\")\n  createdAt         DateTime         @default(now()) @map(\"created_at\")\n  updatedAt         DateTime         @updatedAt @map(\"updated_at\")\n  memberships       UserMembership[]\n\n  @@map(\"membership_plans\")\n}\n\nmodel UserMembership {\n  id          Int              @id @default(autoincrement())\n  userId      Int              @map(\"user_id\")\n  planId      Int              @map(\"plan_id\")\n  startsAt    DateTime         @map(\"starts_at\")\n  endsAt      DateTime         @map(\"ends_at\")\n  status      MembershipStatus @default(active)\n  autoRenew   Boolean          @default(false) @map(\"auto_renew\")\n  cancelledAt DateTime?        @map(\"cancelled_at\")\n  createdAt   DateTime         @default(now()) @map(\"created_at\")\n  updatedAt   DateTime         @updatedAt @map(\"updated_at\")\n  user        User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  plan        MembershipPlan   @relation(fields: [planId], references: [id])\n  payments    Payment[]\n\n  @@index([userId, status])\n  @@index([endsAt])\n  @@map(\"user_memberships\")\n}\n\nmodel Payment {\n  id                   Int             @id @default(autoincrement())\n  userId               Int             @map(\"user_id\")\n  membershipId         Int?            @map(\"membership_id\")\n  transactionReference String          @unique @map(\"transaction_reference\") @db.VarChar(255)\n  gateway              String          @db.VarChar(50)\n  gatewayPaymentId     String?         @map(\"gateway_payment_id\") @db.VarChar(255)\n  amount               Decimal         @db.Decimal(10, 2)\n  currency             String          @default(\"CAD\") @db.VarChar(3)\n  taxAmount            Decimal         @default(0.00) @map(\"tax_amount\") @db.Decimal(10, 2)\n  paymentMethod        String          @map(\"payment_method\") @db.VarChar(50)\n  status               PaymentStatus   @default(pending)\n  failureReason        String?         @map(\"failure_reason\") @db.VarChar(255)\n  refundedAt           DateTime?       @map(\"refunded_at\")\n  createdAt            DateTime        @default(now()) @map(\"created_at\")\n  user                 User            @relation(fields: [userId], references: [id], onDelete: Restrict)\n  membership           UserMembership? @relation(fields: [membershipId], references: [id])\n  invoice              Invoice?\n\n  @@index([userId])\n  @@index([status])\n  @@map(\"payments\")\n}\n\nmodel Invoice {\n  id            Int      @id @default(autoincrement())\n  paymentId     Int      @unique @map(\"payment_id\")\n  invoiceNumber String   @unique @map(\"invoice_number\") @db.VarChar(100)\n  invoicePdfUrl String?  @map(\"invoice_pdf_url\") @db.VarChar(500)\n  issuedAt      DateTime @default(now()) @map(\"issued_at\")\n  payment       Payment  @relation(fields: [paymentId], references: [id], onDelete: Restrict)\n\n  @@map(\"invoices\")\n}\n\n// =============================================================================\n// SECTION 13: MODERATION & SUPPORT DOMAIN\n// =============================================================================\n\nmodel Report {\n  id                Int          @id @default(autoincrement())\n  reporterUserId    Int          @map(\"reporter_user_id\")\n  reportedProfileId Int          @map(\"reported_profile_id\")\n  reason            String       @db.VarChar(100)\n  description       String?      @db.Text\n  status            ReportStatus @default(pending)\n  moderatorId       Int?         @map(\"moderator_id\")\n  moderatorNote     String?      @map(\"moderator_note\") @db.Text\n  resolvedAt        DateTime?    @map(\"resolved_at\")\n  createdAt         DateTime     @default(now()) @map(\"created_at\")\n  updatedAt         DateTime     @updatedAt @map(\"updated_at\")\n  reporter          User         @relation(\"ReportReporter\", fields: [reporterUserId], references: [id], onDelete: Cascade)\n  reportedProfile   Profile      @relation(\"ReportTarget\", fields: [reportedProfileId], references: [id], onDelete: Cascade)\n\n  @@index([status])\n  @@index([reportedProfileId])\n  @@map(\"reports\")\n}\n\nmodel SupportTicket {\n  id           Int             @id @default(autoincrement())\n  userId       Int             @map(\"user_id\")\n  subject      String          @db.VarChar(255)\n  category     String          @db.VarChar(100)\n  status       TicketStatus    @default(open)\n  priority     String          @default(\"normal\") @db.VarChar(20)\n  assignedToId Int?            @map(\"assigned_to_id\")\n  resolvedAt   DateTime?       @map(\"resolved_at\")\n  createdAt    DateTime        @default(now()) @map(\"created_at\")\n  updatedAt    DateTime        @updatedAt @map(\"updated_at\")\n  user         User            @relation(\"TicketOwner\", fields: [userId], references: [id], onDelete: Cascade)\n  messages     TicketMessage[]\n\n  @@index([userId])\n  @@index([status])\n  @@map(\"support_tickets\")\n}\n\nmodel TicketMessage {\n  id        Int           @id @default(autoincrement())\n  ticketId  Int           @map(\"ticket_id\")\n  senderId  Int           @map(\"sender_id\")\n  body      String        @db.Text\n  isStaff   Boolean       @default(false) @map(\"is_staff\")\n  createdAt DateTime      @default(now()) @map(\"created_at\")\n  ticket    SupportTicket @relation(fields: [ticketId], references: [id], onDelete: Cascade)\n  sender    User          @relation(fields: [senderId], references: [id])\n\n  @@index([ticketId])\n  @@map(\"ticket_messages\")\n}\n\n// =============================================================================\n// SECTION 14: CMS DOMAIN\n// =============================================================================\n\nmodel BlogPost {\n  id              Int           @id @default(autoincrement())\n  authorId        Int?          @map(\"author_id\")\n  slug            String        @unique @db.VarChar(200)\n  titleEn         String        @map(\"title_en\") @db.VarChar(255)\n  titleTa         String?       @map(\"title_ta\") @db.VarChar(255)\n  bodyEn          String        @map(\"body_en\") @db.LongText\n  bodyTa          String?       @map(\"body_ta\") @db.LongText\n  metaDescription String?       @map(\"meta_description\") @db.VarChar(300)\n  featuredImage   String?       @map(\"featured_image\") @db.VarChar(500)\n  status          PostStatus    @default(draft)\n  publishedAt     DateTime?     @map(\"published_at\")\n  createdAt       DateTime      @default(now()) @map(\"created_at\")\n  updatedAt       DateTime      @updatedAt @map(\"updated_at\")\n  tags            BlogPostTag[]\n\n  @@index([status, publishedAt])\n  @@map(\"blog_posts\")\n}\n\nmodel BlogTag {\n  id    Int           @id @default(autoincrement())\n  name  String        @unique @db.VarChar(100)\n  slug  String        @unique @db.VarChar(100)\n  posts BlogPostTag[]\n\n  @@map(\"blog_tags\")\n}\n\nmodel BlogPostTag {\n  postId Int      @map(\"post_id\")\n  tagId  Int      @map(\"tag_id\")\n  post   BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)\n  tag    BlogTag  @relation(fields: [tagId], references: [id], onDelete: Cascade)\n\n  @@id([postId, tagId])\n  @@map(\"blog_post_tags\")\n}\n\nmodel Faq {\n  id         Int      @id @default(autoincrement())\n  categoryId Int?     @map(\"category_id\")\n  questionEn String   @map(\"question_en\") @db.VarChar(500)\n  questionTa String?  @map(\"question_ta\") @db.VarChar(500)\n  answerEn   String   @map(\"answer_en\") @db.Text\n  answerTa   String?  @map(\"answer_ta\") @db.Text\n  sortOrder  Int      @default(999) @map(\"sort_order\")\n  isActive   Boolean  @default(true) @map(\"is_active\")\n  createdAt  DateTime @default(now()) @map(\"created_at\")\n  updatedAt  DateTime @updatedAt @map(\"updated_at\")\n\n  @@index([categoryId])\n  @@map(\"faqs\")\n}\n\nmodel MenuItem {\n  id           Int        @id @default(autoincrement())\n  parentId     Int?       @map(\"parent_id\")\n  titleEn      String     @map(\"title_en\") @db.VarChar(100)\n  titleTa      String     @map(\"title_ta\") @db.VarChar(100)\n  targetUrl    String     @map(\"target_url\") @db.VarChar(255)\n  icon         String?    @db.VarChar(100)\n  displayOrder Int        @map(\"display_order\")\n  isActive     Boolean    @default(true) @map(\"is_active\")\n  parent       MenuItem?  @relation(\"MenuItemParent\", fields: [parentId], references: [id])\n  children     MenuItem[] @relation(\"MenuItemParent\")\n\n  @@map(\"menu_items\")\n}\n\n// =============================================================================\n// SECTION 15: SYSTEM CONFIGURATION\n// =============================================================================\n\nmodel Setting {\n  id          Int      @id @default(autoincrement())\n  key         String   @unique @db.VarChar(150)\n  value       String   @db.Text\n  type        String   @default(\"string\") @db.VarChar(20)\n  description String?  @db.VarChar(255)\n  isPublic    Boolean  @default(false) @map(\"is_public\")\n  updatedAt   DateTime @updatedAt @map(\"updated_at\")\n\n  @@map(\"settings\")\n}\n\n// =============================================================================\n// SECTION 16: AUDIT & SECURITY LOGGING\n// =============================================================================\n\nmodel AuditLog {\n  id          Int      @id @default(autoincrement())\n  userId      Int?     @map(\"user_id\")\n  actionType  String   @map(\"action_type\") @db.VarChar(100)\n  entityType  String?  @map(\"entity_type\") @db.VarChar(100)\n  entityId    Int?     @map(\"entity_id\")\n  description String   @db.Text\n  oldValue    Json?    @map(\"old_value\")\n  newValue    Json?    @map(\"new_value\")\n  ipAddress   String?  @map(\"ip_address\") @db.VarChar(45)\n  userAgent   String?  @map(\"user_agent\") @db.VarChar(500)\n  createdAt   DateTime @default(now()) @map(\"created_at\")\n  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)\n\n  @@index([userId])\n  @@index([actionType])\n  @@index([createdAt])\n  @@map(\"audit_logs\")\n}\n\nmodel SecurityEvent {\n  id          Int      @id @default(autoincrement())\n  userId      Int?     @map(\"user_id\")\n  eventType   String   @map(\"event_type\") @db.VarChar(100)\n  severity    String   @default(\"info\") @db.VarChar(20)\n  ipAddress   String   @map(\"ip_address\") @db.VarChar(45)\n  userAgent   String?  @map(\"user_agent\") @db.VarChar(500)\n  description String   @db.VarChar(500)\n  createdAt   DateTime @default(now()) @map(\"created_at\")\n\n  @@index([userId])\n  @@index([ipAddress])\n  @@index([eventType])\n  @@index([createdAt])\n  @@map(\"security_events\")\n}\n\n// =============================================================================\n// SECTION 17: BROKER APPOINTMENTS\n// =============================================================================\n\nenum AppointmentStatus {\n  upcoming\n  completed\n  cancelled\n  rescheduled\n  pending\n}\n\nenum AppointmentType {\n  video_call\n  phone_call\n  in_person\n  whatsapp\n}\n\nmodel Appointment {\n  id              Int               @id @default(autoincrement())\n  brokerUserId    Int               @map(\"broker_user_id\")\n  clientProfileId Int?              @map(\"client_profile_id\")\n  title           String            @db.VarChar(200)\n  scheduledAt     DateTime          @map(\"scheduled_at\")\n  type            AppointmentType   @default(video_call)\n  status          AppointmentStatus @default(upcoming)\n  notes           String?           @db.Text\n  meetingLink     String?           @map(\"meeting_link\") @db.VarChar(500)\n  createdAt       DateTime          @default(now()) @map(\"created_at\")\n  updatedAt       DateTime          @updatedAt @map(\"updated_at\")\n  brokerUser      User              @relation(\"BrokerAppointments\", fields: [brokerUserId], references: [id], onDelete: Cascade)\n  clientProfile   Profile?          @relation(\"ClientAppointments\", fields: [clientProfileId], references: [id], onDelete: SetNull)\n\n  @@index([brokerUserId, scheduledAt])\n  @@index([status])\n  @@map(\"appointments\")\n}\n\n// =============================================================================\n// SECTION 18: PASSWORD RESET SYSTEM\n// =============================================================================\n\nmodel PasswordResetToken {\n  id          Int      @id @default(autoincrement())\n  userId      Int      @map(\"user_id\")\n  accountType String   @map(\"account_type\") @db.VarChar(50)\n  token       String   @unique @db.VarChar(255)\n  otp         String?  @db.VarChar(10)\n  expiresAt   DateTime @map(\"expires_at\")\n  used        Boolean  @default(false)\n  createdAt   DateTime @default(now()) @map(\"created_at\")\n  ipAddress   String?  @map(\"ip_address\") @db.VarChar(45)\n  userAgent   String?  @map(\"user_agent\") @db.VarChar(500)\n\n  @@index([token])\n  @@index([userId, accountType])\n  @@map(\"password_reset_tokens\")\n}\n",
  "inlineSchemaHash": "c6de6684521ac48d00f9f81634f46497b3b4ca03d20882fcc9a5b28784c94f8c",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "prisma-client",
    "",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Permission\":{\"dbName\":\"permissions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RolePermission\",\"relationName\":\"PermissionToRolePermission\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Role\":{\"dbName\":\"roles\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isSystem\",\"dbName\":\"is_system\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserRole\",\"relationName\":\"RoleToUserRole\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permissions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RolePermission\",\"relationName\":\"RoleToRolePermission\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"RolePermission\":{\"dbName\":\"role_permissions\",\"fields\":[{\"name\":\"roleId\",\"dbName\":\"role_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permissionId\",\"dbName\":\"permission_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Role\",\"relationName\":\"RoleToRolePermission\",\"relationFromFields\":[\"roleId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permission\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Permission\",\"relationName\":\"PermissionToRolePermission\",\"relationFromFields\":[\"permissionId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"roleId\",\"permissionId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":\"users\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"dbName\":\"phone_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accountType\",\"dbName\":\"account_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AccountType\",\"default\":\"individual\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isEmailVerified\",\"dbName\":\"is_email_verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPhoneVerified\",\"dbName\":\"is_phone_verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isApproved\",\"dbName\":\"is_approved\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isSuspended\",\"dbName\":\"is_suspended\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uiLanguage\",\"dbName\":\"ui_language\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"en\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastLoginAt\",\"dbName\":\"last_login_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"deletedAt\",\"dbName\":\"deleted_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserRole\",\"relationName\":\"UserToUserRole\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Session\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memberships\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserMembership\",\"relationName\":\"UserToUserMembership\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"PaymentToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"favorites\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Favorite\",\"relationName\":\"UserFavorites\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blocksInitiated\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Block\",\"relationName\":\"BlockerUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blocksReceived\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Block\",\"relationName\":\"BlockedUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewsMade\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RecentView\",\"relationName\":\"ViewerUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sentMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"relationName\":\"MessageSender\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notifications\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Notification\",\"relationName\":\"NotificationToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reportsSubmitted\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Report\",\"relationName\":\"ReportReporter\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auditLogs\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AuditLog\",\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversationParts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConversationParticipant\",\"relationName\":\"ConversationParticipantToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"supportTickets\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SupportTicket\",\"relationName\":\"TicketOwner\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ticketMessages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TicketMessage\",\"relationName\":\"TicketMessageToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brokerProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BrokerProfile\",\"relationName\":\"BrokerProfileToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brokerAppointments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Appointment\",\"relationName\":\"BrokerAppointments\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserRole\":{\"dbName\":\"user_roles\",\"fields\":[{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"roleId\",\"dbName\":\"role_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"grantedAt\",\"dbName\":\"granted_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserRole\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Role\",\"relationName\":\"RoleToUserRole\",\"relationFromFields\":[\"roleId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"userId\",\"roleId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Session\":{\"dbName\":\"sessions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refreshToken\",\"dbName\":\"refresh_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deviceName\",\"dbName\":\"device_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isRevoked\",\"dbName\":\"is_revoked\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OtpCode\":{\"dbName\":\"otp_codes\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otpHash\",\"dbName\":\"otp_hash\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"purpose\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attemptCount\",\"dbName\":\"attempt_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usedAt\",\"dbName\":\"used_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EmailVerification\":{\"dbName\":\"email_verifications\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BrokerProfile\":{\"dbName\":\"broker_profiles\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"agencyName\",\"dbName\":\"agency_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"licenseNumber\",\"dbName\":\"license_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isVerified\",\"dbName\":\"is_verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxProfileQuota\",\"dbName\":\"max_profile_quota\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":10,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"whatsappNumber\",\"dbName\":\"whatsapp_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"dbName\":\"country\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"dbName\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"district\",\"dbName\":\"district\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"officeAddress\",\"dbName\":\"office_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"yearsOfExperience\",\"dbName\":\"years_of_experience\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numberOfActiveClients\",\"dbName\":\"number_of_active_clients\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"registrationNumber\",\"dbName\":\"registration_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"governmentIdUrl\",\"dbName\":\"government_id_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profilePhotoUrl\",\"dbName\":\"profile_photo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"websiteUrl\",\"dbName\":\"website_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verificationStatus\",\"dbName\":\"verification_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BrokerVerificationStatus\",\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rejectionReason\",\"dbName\":\"rejection_reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"approvedAt\",\"dbName\":\"approved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otpCode\",\"dbName\":\"otp_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otpExpiresAt\",\"dbName\":\"otp_expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isEmailVerified\",\"dbName\":\"is_email_verified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"BrokerProfileToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Religion\":{\"dbName\":\"religions\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":999,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"castes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Caste\",\"relationName\":\"CasteToReligion\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToReligion\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Caste\":{\"dbName\":\"castes\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"religionId\",\"dbName\":\"religion_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":999,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"religion\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Religion\",\"relationName\":\"CasteToReligion\",\"relationFromFields\":[\"religionId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subCastes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SubCaste\",\"relationName\":\"CasteToSubCaste\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"CasteToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partnerPreferenceCastes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerPreferenceCaste\",\"relationName\":\"CasteToPartnerPreferenceCaste\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"religionId\",\"nameEn\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"religionId\",\"nameEn\"]}],\"isGenerated\":false},\"SubCaste\":{\"dbName\":\"sub_castes\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"casteId\",\"dbName\":\"caste_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caste\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Caste\",\"relationName\":\"CasteToSubCaste\",\"relationFromFields\":[\"casteId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToSubCaste\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"casteId\",\"nameEn\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"casteId\",\"nameEn\"]}],\"isGenerated\":false},\"Raasi\":{\"dbName\":\"raasis\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numeralCode\",\"dbName\":\"numeral_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToRaasi\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Star\":{\"dbName\":\"stars\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numeralCode\",\"dbName\":\"numeral_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"raasiId\",\"dbName\":\"raasi_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToStar\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Country\":{\"dbName\":\"countries\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"iso2\",\"dbName\":\"iso2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"iso3\",\"dbName\":\"iso3\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dialingCode\",\"dbName\":\"dialing_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priority\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":999,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bornProfiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileBornCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentProfiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileCurrentCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"states\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"State\",\"relationName\":\"CountryToState\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preferredByProfiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerPreferenceCountry\",\"relationName\":\"CountryToPartnerPreferenceCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"State\":{\"dbName\":\"states\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryId\",\"dbName\":\"country_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountryToState\",\"relationFromFields\":[\"countryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cities\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"City\",\"relationName\":\"CityToState\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profilesCurrent\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileCurrentState\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"City\":{\"dbName\":\"cities\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stateId\",\"dbName\":\"state_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"State\",\"relationName\":\"CityToState\",\"relationFromFields\":[\"stateId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profilesCurrent\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileCurrentCity\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MotherTongue\":{\"dbName\":\"mother_tongues\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"MotherTongueToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EducationCategory\":{\"dbName\":\"education_categories\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":999,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"details\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EducationDetail\",\"relationName\":\"EducationCategoryToEducationDetail\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"EducationCategoryToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"EducationDetail\":{\"dbName\":\"education_details\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"dbName\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EducationCategory\",\"relationName\":\"EducationCategoryToEducationDetail\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"EducationDetailToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OccupationCategory\":{\"dbName\":\"occupation_categories\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":999,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"details\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OccupationDetail\",\"relationName\":\"OccupationCategoryToOccupationDetail\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"OccupationCategoryToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OccupationDetail\":{\"dbName\":\"occupation_details\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"dbName\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameEn\",\"dbName\":\"name_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nameTa\",\"dbName\":\"name_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OccupationCategory\",\"relationName\":\"OccupationCategoryToOccupationDetail\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profiles\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"OccupationDetailToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Profile\":{\"dbName\":\"profiles\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileRegisteredFor\",\"dbName\":\"profile_registered_for\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProfileRegisteredFor\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ProfileStatus\",\"default\":\"draft\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Gender\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dateOfBirth\",\"dbName\":\"date_of_birth\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maritalStatus\",\"dbName\":\"marital_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MaritalStatus\",\"default\":\"never_married\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"heightCm\",\"dbName\":\"height_cm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"weightKg\",\"dbName\":\"weight_kg\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bodyType\",\"dbName\":\"body_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BodyType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"complexion\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Complexion\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"motherTongueId\",\"dbName\":\"mother_tongue_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"educationCategoryId\",\"dbName\":\"education_category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"educationDetailId\",\"dbName\":\"education_detail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"occupationCategoryId\",\"dbName\":\"occupation_category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"occupationDetailId\",\"dbName\":\"occupation_detail_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"annualIncome\",\"dbName\":\"annual_income\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"IncomeRange\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"religionId\",\"dbName\":\"religion_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"casteId\",\"dbName\":\"caste_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subCasteId\",\"dbName\":\"sub_caste_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"raasiId\",\"dbName\":\"raasi_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"starId\",\"dbName\":\"star_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gotram\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bornCountryId\",\"dbName\":\"born_country_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentCountryId\",\"dbName\":\"current_country_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentStateId\",\"dbName\":\"current_state_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentCityId\",\"dbName\":\"current_city_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cityOrState\",\"dbName\":\"city_or_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mainProfilePicture\",\"dbName\":\"main_profile_picture\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"aboutMe\",\"dbName\":\"about_me\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isManglik\",\"dbName\":\"is_manglik\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileViewCount\",\"dbName\":\"profile_view_count\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isProfileComplete\",\"dbName\":\"is_profile_complete\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderatorNote\",\"dbName\":\"moderator_note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"approvedAt\",\"dbName\":\"approved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"deletedAt\",\"dbName\":\"deleted_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ProfileToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"religion\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Religion\",\"relationName\":\"ProfileToReligion\",\"relationFromFields\":[\"religionId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caste\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Caste\",\"relationName\":\"CasteToProfile\",\"relationFromFields\":[\"casteId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subCaste\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SubCaste\",\"relationName\":\"ProfileToSubCaste\",\"relationFromFields\":[\"subCasteId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"raasi\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Raasi\",\"relationName\":\"ProfileToRaasi\",\"relationFromFields\":[\"raasiId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"star\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Star\",\"relationName\":\"ProfileToStar\",\"relationFromFields\":[\"starId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"motherTongue\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MotherTongue\",\"relationName\":\"MotherTongueToProfile\",\"relationFromFields\":[\"motherTongueId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"educationCategory\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EducationCategory\",\"relationName\":\"EducationCategoryToProfile\",\"relationFromFields\":[\"educationCategoryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"educationDetail\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EducationDetail\",\"relationName\":\"EducationDetailToProfile\",\"relationFromFields\":[\"educationDetailId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"occupationCategory\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OccupationCategory\",\"relationName\":\"OccupationCategoryToProfile\",\"relationFromFields\":[\"occupationCategoryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"occupationDetail\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OccupationDetail\",\"relationName\":\"OccupationDetailToProfile\",\"relationFromFields\":[\"occupationDetailId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bornCountry\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"ProfileBornCountry\",\"relationFromFields\":[\"bornCountryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentCountry\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"ProfileCurrentCountry\",\"relationFromFields\":[\"currentCountryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentState\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"State\",\"relationName\":\"ProfileCurrentState\",\"relationFromFields\":[\"currentStateId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currentCity\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"City\",\"relationName\":\"ProfileCurrentCity\",\"relationFromFields\":[\"currentCityId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"photos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Photo\",\"relationName\":\"PhotoToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ProfileDocument\",\"relationName\":\"ProfileToProfileDocument\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lifestyle\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Lifestyle\",\"relationName\":\"LifestyleToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"familyDetail\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FamilyDetail\",\"relationName\":\"FamilyDetailToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partnerPreference\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerPreference\",\"relationName\":\"PartnerPreferenceToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"favoritedBy\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Favorite\",\"relationName\":\"FavoriteToProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"recentViews\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"RecentView\",\"relationName\":\"ProfileToRecentView\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"interestsSent\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Interest\",\"relationName\":\"InterestSender\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"interestsReceived\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Interest\",\"relationName\":\"InterestReceiver\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reportsAgainst\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Report\",\"relationName\":\"ReportTarget\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"compatibilityScores\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CompatibilityScore\",\"relationName\":\"ScoreProfile\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientAppointments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Appointment\",\"relationName\":\"ClientAppointments\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Photo\":{\"dbName\":\"photos\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileId\",\"dbName\":\"profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"photoUrl\",\"dbName\":\"photo_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"thumbnailUrl\",\"dbName\":\"thumbnail_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PhotoStatus\",\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isMain\",\"dbName\":\"is_main\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uploadedAt\",\"dbName\":\"uploaded_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderatedAt\",\"dbName\":\"moderated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderatorId\",\"dbName\":\"moderator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"PhotoToProfile\",\"relationFromFields\":[\"profileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ProfileDocument\":{\"dbName\":\"profile_documents\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileId\",\"dbName\":\"profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"documentType\",\"dbName\":\"document_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DocumentType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileUrl\",\"dbName\":\"file_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fileType\",\"dbName\":\"file_type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FileType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DocumentStatus\",\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"uploadedAt\",\"dbName\":\"uploaded_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verifiedAt\",\"dbName\":\"verified_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"verifiedById\",\"dbName\":\"verified_by_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToProfileDocument\",\"relationFromFields\":[\"profileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Lifestyle\":{\"dbName\":\"lifestyles\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileId\",\"dbName\":\"profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"diet\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DietType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drinking\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DrinkingHabit\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"smoking\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SmokingHabit\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"physicalActivity\",\"dbName\":\"physical_activity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hobbies\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languages\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"LifestyleToProfile\",\"relationFromFields\":[\"profileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"FamilyDetail\":{\"dbName\":\"family_details\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileId\",\"dbName\":\"profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fatherName\",\"dbName\":\"father_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fatherOccupation\",\"dbName\":\"father_occupation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"motherName\",\"dbName\":\"mother_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"motherOccupation\",\"dbName\":\"mother_occupation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numBrothers\",\"dbName\":\"num_brothers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numMarriedBrothers\",\"dbName\":\"num_married_brothers\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numSisters\",\"dbName\":\"num_sisters\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numMarriedSisters\",\"dbName\":\"num_married_sisters\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"familyStatus\",\"dbName\":\"family_status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FamilyStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"familyValues\",\"dbName\":\"family_values\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"FamilyValues\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"familyOriginCity\",\"dbName\":\"family_origin_city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"familyOriginCountryId\",\"dbName\":\"family_origin_country_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"additionalInfo\",\"dbName\":\"additional_info\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"FamilyDetailToProfile\",\"relationFromFields\":[\"profileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PartnerPreference\":{\"dbName\":\"partner_preferences\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileId\",\"dbName\":\"profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minAge\",\"dbName\":\"min_age\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxAge\",\"dbName\":\"max_age\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"minHeightCm\",\"dbName\":\"min_height_cm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxHeightCm\",\"dbName\":\"max_height_cm\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maritalStatuses\",\"dbName\":\"marital_statuses\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"diet\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DietType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"smoking\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SmokingHabit\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"drinking\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DrinkingHabit\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"incomeMin\",\"dbName\":\"income_min\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"IncomeRange\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otherNotes\",\"dbName\":\"other_notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"PartnerPreferenceToProfile\",\"relationFromFields\":[\"profileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preferredCastes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerPreferenceCaste\",\"relationName\":\"PartnerPreferenceToPartnerPreferenceCaste\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preferredCountries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerPreferenceCountry\",\"relationName\":\"PartnerPreferenceToPartnerPreferenceCountry\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PartnerPreferenceCaste\":{\"dbName\":\"partner_preference_castes\",\"fields\":[{\"name\":\"preferenceId\",\"dbName\":\"preference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"casteId\",\"dbName\":\"caste_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preference\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerPreference\",\"relationName\":\"PartnerPreferenceToPartnerPreferenceCaste\",\"relationFromFields\":[\"preferenceId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"caste\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Caste\",\"relationName\":\"CasteToPartnerPreferenceCaste\",\"relationFromFields\":[\"casteId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"preferenceId\",\"casteId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PartnerPreferenceCountry\":{\"dbName\":\"partner_preference_countries\",\"fields\":[{\"name\":\"preferenceId\",\"dbName\":\"preference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryId\",\"dbName\":\"country_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preference\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"PartnerPreference\",\"relationName\":\"PartnerPreferenceToPartnerPreferenceCountry\",\"relationFromFields\":[\"preferenceId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"country\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Country\",\"relationName\":\"CountryToPartnerPreferenceCountry\",\"relationFromFields\":[\"countryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"preferenceId\",\"countryId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Interest\":{\"dbName\":\"interests\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senderProfileId\",\"dbName\":\"sender_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"receiverProfileId\",\"dbName\":\"receiver_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"InterestStatus\",\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messageNote\",\"dbName\":\"message_note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"respondedAt\",\"dbName\":\"responded_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"senderProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"InterestSender\",\"relationFromFields\":[\"senderProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"receiverProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"InterestReceiver\",\"relationFromFields\":[\"receiverProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"senderProfileId\",\"receiverProfileId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"senderProfileId\",\"receiverProfileId\"]}],\"isGenerated\":false},\"Favorite\":{\"dbName\":\"favorites\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileId\",\"dbName\":\"profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserFavorites\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"FavoriteToProfile\",\"relationFromFields\":[\"profileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"userId\",\"profileId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"userId\",\"profileId\"]}],\"isGenerated\":false},\"Block\":{\"dbName\":\"blocks\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blockerUserId\",\"dbName\":\"blocker_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blockedUserId\",\"dbName\":\"blocked_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blocker\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"BlockerUser\",\"relationFromFields\":[\"blockerUserId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"blocked\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"BlockedUser\",\"relationFromFields\":[\"blockedUserId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"blockerUserId\",\"blockedUserId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"blockerUserId\",\"blockedUserId\"]}],\"isGenerated\":false},\"RecentView\":{\"dbName\":\"recent_views\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewerUserId\",\"dbName\":\"viewer_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewedProfileId\",\"dbName\":\"viewed_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewedAt\",\"dbName\":\"viewed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewer\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ViewerUser\",\"relationFromFields\":[\"viewerUserId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"viewedProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToRecentView\",\"relationFromFields\":[\"viewedProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CompatibilityScore\":{\"dbName\":\"compatibility_scores\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profileId\",\"dbName\":\"profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetProfileId\",\"dbName\":\"target_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"overallScore\",\"dbName\":\"overall_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"astroScore\",\"dbName\":\"astro_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locationScore\",\"dbName\":\"location_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cultureScore\",\"dbName\":\"culture_score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"highlights\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"flags\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"computedAt\",\"dbName\":\"computed_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ScoreProfile\",\"relationFromFields\":[\"profileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"profileId\",\"targetProfileId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"profileId\",\"targetProfileId\"]}],\"isGenerated\":false},\"Conversation\":{\"dbName\":\"conversations\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastMessageAt\",\"dbName\":\"last_message_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Message\",\"relationName\":\"ConversationToMessage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"participants\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ConversationParticipant\",\"relationName\":\"ConversationToConversationParticipant\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ConversationParticipant\":{\"dbName\":\"conversation_participants\",\"fields\":[{\"name\":\"conversationId\",\"dbName\":\"conversation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"joinedAt\",\"dbName\":\"joined_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastReadAt\",\"dbName\":\"last_read_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Conversation\",\"relationName\":\"ConversationToConversationParticipant\",\"relationFromFields\":[\"conversationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ConversationParticipantToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"conversationId\",\"userId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Message\":{\"dbName\":\"messages\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversationId\",\"dbName\":\"conversation_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senderId\",\"dbName\":\"sender_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messageText\",\"dbName\":\"message_text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isRead\",\"dbName\":\"is_read\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"readAt\",\"dbName\":\"read_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deletedBySender\",\"dbName\":\"deleted_by_sender\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"conversation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Conversation\",\"relationName\":\"ConversationToMessage\",\"relationFromFields\":[\"conversationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sender\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"MessageSender\",\"relationFromFields\":[\"senderId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Notification\":{\"dbName\":\"notifications\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"NotificationType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"titleEn\",\"dbName\":\"title_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"titleTa\",\"dbName\":\"title_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bodyEn\",\"dbName\":\"body_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bodyTa\",\"dbName\":\"body_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"referenceId\",\"dbName\":\"reference_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isRead\",\"dbName\":\"is_read\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"readAt\",\"dbName\":\"read_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"NotificationToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MembershipPlan\":{\"dbName\":\"membership_plans\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"CAD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"durationDays\",\"dbName\":\"duration_days\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"features\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"highlightFeatures\",\"dbName\":\"highlight_features\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxInterestsDaily\",\"dbName\":\"max_interests_daily\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxMessagesDaily\",\"dbName\":\"max_messages_daily\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"canViewContacts\",\"dbName\":\"can_view_contacts\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"canViewHoroscope\",\"dbName\":\"can_view_horoscope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":999,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"memberships\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserMembership\",\"relationName\":\"MembershipPlanToUserMembership\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserMembership\":{\"dbName\":\"user_memberships\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"planId\",\"dbName\":\"plan_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startsAt\",\"dbName\":\"starts_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endsAt\",\"dbName\":\"ends_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"MembershipStatus\",\"default\":\"active\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"autoRenew\",\"dbName\":\"auto_renew\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cancelledAt\",\"dbName\":\"cancelled_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserMembership\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"plan\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MembershipPlan\",\"relationName\":\"MembershipPlanToUserMembership\",\"relationFromFields\":[\"planId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"PaymentToUserMembership\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Payment\":{\"dbName\":\"payments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"membershipId\",\"dbName\":\"membership_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transactionReference\",\"dbName\":\"transaction_reference\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gateway\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gatewayPaymentId\",\"dbName\":\"gateway_payment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"CAD\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"taxAmount\",\"dbName\":\"tax_amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Decimal\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentMethod\",\"dbName\":\"payment_method\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PaymentStatus\",\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"failureReason\",\"dbName\":\"failure_reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refundedAt\",\"dbName\":\"refunded_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"PaymentToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"membership\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserMembership\",\"relationName\":\"PaymentToUserMembership\",\"relationFromFields\":[\"membershipId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoice\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Invoice\",\"relationName\":\"InvoiceToPayment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Invoice\":{\"dbName\":\"invoices\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentId\",\"dbName\":\"payment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoiceNumber\",\"dbName\":\"invoice_number\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invoicePdfUrl\",\"dbName\":\"invoice_pdf_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"issuedAt\",\"dbName\":\"issued_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"InvoiceToPayment\",\"relationFromFields\":[\"paymentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Restrict\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Report\":{\"dbName\":\"reports\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reporterUserId\",\"dbName\":\"reporter_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reportedProfileId\",\"dbName\":\"reported_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"ReportStatus\",\"default\":\"pending\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderatorId\",\"dbName\":\"moderator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"moderatorNote\",\"dbName\":\"moderator_note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolvedAt\",\"dbName\":\"resolved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"reporter\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ReportReporter\",\"relationFromFields\":[\"reporterUserId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reportedProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ReportTarget\",\"relationFromFields\":[\"reportedProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SupportTicket\":{\"dbName\":\"support_tickets\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"subject\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"TicketStatus\",\"default\":\"open\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"priority\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"normal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"assignedToId\",\"dbName\":\"assigned_to_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resolvedAt\",\"dbName\":\"resolved_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TicketOwner\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"messages\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"TicketMessage\",\"relationName\":\"SupportTicketToTicketMessage\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"TicketMessage\":{\"dbName\":\"ticket_messages\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ticketId\",\"dbName\":\"ticket_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senderId\",\"dbName\":\"sender_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isStaff\",\"dbName\":\"is_staff\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ticket\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"SupportTicket\",\"relationName\":\"SupportTicketToTicketMessage\",\"relationFromFields\":[\"ticketId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sender\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TicketMessageToUser\",\"relationFromFields\":[\"senderId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BlogPost\":{\"dbName\":\"blog_posts\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"dbName\":\"author_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"titleEn\",\"dbName\":\"title_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"titleTa\",\"dbName\":\"title_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bodyEn\",\"dbName\":\"body_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bodyTa\",\"dbName\":\"body_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metaDescription\",\"dbName\":\"meta_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"featuredImage\",\"dbName\":\"featured_image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PostStatus\",\"default\":\"draft\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"publishedAt\",\"dbName\":\"published_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"tags\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BlogPostTag\",\"relationName\":\"BlogPostToBlogPostTag\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BlogTag\":{\"dbName\":\"blog_tags\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"slug\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"posts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BlogPostTag\",\"relationName\":\"BlogPostTagToBlogTag\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"BlogPostTag\":{\"dbName\":\"blog_post_tags\",\"fields\":[{\"name\":\"postId\",\"dbName\":\"post_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tagId\",\"dbName\":\"tag_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"post\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BlogPost\",\"relationName\":\"BlogPostToBlogPostTag\",\"relationFromFields\":[\"postId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tag\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BlogTag\",\"relationName\":\"BlogPostTagToBlogTag\",\"relationFromFields\":[\"tagId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"postId\",\"tagId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Faq\":{\"dbName\":\"faqs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"dbName\":\"category_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"questionEn\",\"dbName\":\"question_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"questionTa\",\"dbName\":\"question_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"answerEn\",\"dbName\":\"answer_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"answerTa\",\"dbName\":\"answer_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sortOrder\",\"dbName\":\"sort_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":999,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MenuItem\":{\"dbName\":\"menu_items\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parentId\",\"dbName\":\"parent_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"titleEn\",\"dbName\":\"title_en\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"titleTa\",\"dbName\":\"title_ta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"targetUrl\",\"dbName\":\"target_url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"icon\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"displayOrder\",\"dbName\":\"display_order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isActive\",\"dbName\":\"is_active\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"parent\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MenuItem\",\"relationName\":\"MenuItemParent\",\"relationFromFields\":[\"parentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"children\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MenuItem\",\"relationName\":\"MenuItemParent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Setting\":{\"dbName\":\"settings\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"string\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPublic\",\"dbName\":\"is_public\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AuditLog\":{\"dbName\":\"audit_logs\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actionType\",\"dbName\":\"action_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entityType\",\"dbName\":\"entity_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"entityId\",\"dbName\":\"entity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"oldValue\",\"dbName\":\"old_value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"newValue\",\"dbName\":\"new_value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AuditLogToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"SecurityEvent\":{\"dbName\":\"security_events\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventType\",\"dbName\":\"event_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"severity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"info\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Appointment\":{\"dbName\":\"appointments\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"brokerUserId\",\"dbName\":\"broker_user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientProfileId\",\"dbName\":\"client_profile_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scheduledAt\",\"dbName\":\"scheduled_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AppointmentType\",\"default\":\"video_call\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AppointmentStatus\",\"default\":\"upcoming\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"meetingLink\",\"dbName\":\"meeting_link\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"dbName\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"brokerUser\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"BrokerAppointments\",\"relationFromFields\":[\"brokerUserId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"clientProfile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ClientAppointments\",\"relationFromFields\":[\"clientProfileId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"PasswordResetToken\":{\"dbName\":\"password_reset_tokens\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"dbName\":\"user_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accountType\",\"dbName\":\"account_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"otp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"dbName\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"used\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"dbName\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipAddress\",\"dbName\":\"ip_address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userAgent\",\"dbName\":\"user_agent\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"ProfileRegisteredFor\":{\"values\":[{\"name\":\"self\",\"dbName\":null},{\"name\":\"son\",\"dbName\":null},{\"name\":\"daughter\",\"dbName\":null},{\"name\":\"brother\",\"dbName\":null},{\"name\":\"sister\",\"dbName\":null},{\"name\":\"relative\",\"dbName\":null},{\"name\":\"friend\",\"dbName\":null},{\"name\":\"client\",\"dbName\":null}],\"dbName\":null},\"Gender\":{\"values\":[{\"name\":\"M\",\"dbName\":null},{\"name\":\"F\",\"dbName\":null}],\"dbName\":null},\"MaritalStatus\":{\"values\":[{\"name\":\"never_married\",\"dbName\":null},{\"name\":\"divorced\",\"dbName\":null},{\"name\":\"widowed\",\"dbName\":null},{\"name\":\"separated\",\"dbName\":null},{\"name\":\"annulled\",\"dbName\":null}],\"dbName\":null},\"ProfileStatus\":{\"values\":[{\"name\":\"draft\",\"dbName\":null},{\"name\":\"pending_moderation\",\"dbName\":null},{\"name\":\"active\",\"dbName\":null},{\"name\":\"suspended\",\"dbName\":null},{\"name\":\"deactivated\",\"dbName\":null},{\"name\":\"archived\",\"dbName\":null}],\"dbName\":null},\"PhotoStatus\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"approved\",\"dbName\":null},{\"name\":\"rejected\",\"dbName\":null}],\"dbName\":null},\"FileType\":{\"values\":[{\"name\":\"image\",\"dbName\":null},{\"name\":\"pdf\",\"dbName\":null}],\"dbName\":null},\"DocumentType\":{\"values\":[{\"name\":\"horoscope\",\"dbName\":null},{\"name\":\"birth_certificate\",\"dbName\":null},{\"name\":\"id_proof\",\"dbName\":null}],\"dbName\":null},\"DocumentStatus\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"verified\",\"dbName\":null},{\"name\":\"rejected\",\"dbName\":null}],\"dbName\":null},\"InterestStatus\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"accepted\",\"dbName\":null},{\"name\":\"rejected\",\"dbName\":null},{\"name\":\"expired\",\"dbName\":null},{\"name\":\"withdrawn\",\"dbName\":null}],\"dbName\":null},\"MembershipStatus\":{\"values\":[{\"name\":\"active\",\"dbName\":null},{\"name\":\"expired\",\"dbName\":null},{\"name\":\"cancelled\",\"dbName\":null},{\"name\":\"paused\",\"dbName\":null}],\"dbName\":null},\"PaymentStatus\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"succeeded\",\"dbName\":null},{\"name\":\"failed\",\"dbName\":null},{\"name\":\"refunded\",\"dbName\":null},{\"name\":\"disputed\",\"dbName\":null}],\"dbName\":null},\"NotificationType\":{\"values\":[{\"name\":\"interest_received\",\"dbName\":null},{\"name\":\"interest_accepted\",\"dbName\":null},{\"name\":\"interest_rejected\",\"dbName\":null},{\"name\":\"new_message\",\"dbName\":null},{\"name\":\"profile_viewed\",\"dbName\":null},{\"name\":\"payment_success\",\"dbName\":null},{\"name\":\"payment_failed\",\"dbName\":null},{\"name\":\"membership_expiring\",\"dbName\":null},{\"name\":\"photo_approved\",\"dbName\":null},{\"name\":\"photo_rejected\",\"dbName\":null},{\"name\":\"profile_approved\",\"dbName\":null},{\"name\":\"profile_suspended\",\"dbName\":null},{\"name\":\"system_announcement\",\"dbName\":null}],\"dbName\":null},\"ReportStatus\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"investigating\",\"dbName\":null},{\"name\":\"actioned\",\"dbName\":null},{\"name\":\"dismissed\",\"dbName\":null}],\"dbName\":null},\"TicketStatus\":{\"values\":[{\"name\":\"open\",\"dbName\":null},{\"name\":\"in_progress\",\"dbName\":null},{\"name\":\"waiting_on_user\",\"dbName\":null},{\"name\":\"resolved\",\"dbName\":null},{\"name\":\"closed\",\"dbName\":null}],\"dbName\":null},\"PostStatus\":{\"values\":[{\"name\":\"draft\",\"dbName\":null},{\"name\":\"published\",\"dbName\":null},{\"name\":\"archived\",\"dbName\":null}],\"dbName\":null},\"DietType\":{\"values\":[{\"name\":\"vegetarian\",\"dbName\":null},{\"name\":\"non_vegetarian\",\"dbName\":null},{\"name\":\"vegan\",\"dbName\":null},{\"name\":\"eggetarian\",\"dbName\":null},{\"name\":\"jain\",\"dbName\":null}],\"dbName\":null},\"DrinkingHabit\":{\"values\":[{\"name\":\"never\",\"dbName\":null},{\"name\":\"occasionally\",\"dbName\":null},{\"name\":\"regularly\",\"dbName\":null}],\"dbName\":null},\"SmokingHabit\":{\"values\":[{\"name\":\"never\",\"dbName\":null},{\"name\":\"occasionally\",\"dbName\":null},{\"name\":\"regularly\",\"dbName\":null}],\"dbName\":null},\"BodyType\":{\"values\":[{\"name\":\"slim\",\"dbName\":null},{\"name\":\"athletic\",\"dbName\":null},{\"name\":\"average\",\"dbName\":null},{\"name\":\"heavy\",\"dbName\":null}],\"dbName\":null},\"Complexion\":{\"values\":[{\"name\":\"very_fair\",\"dbName\":null},{\"name\":\"fair\",\"dbName\":null},{\"name\":\"wheatish\",\"dbName\":null},{\"name\":\"dark\",\"dbName\":null},{\"name\":\"very_dark\",\"dbName\":null}],\"dbName\":null},\"IncomeRange\":{\"values\":[{\"name\":\"below_20k\",\"dbName\":null},{\"name\":\"range_20k_40k\",\"dbName\":null},{\"name\":\"range_40k_60k\",\"dbName\":null},{\"name\":\"range_60k_100k\",\"dbName\":null},{\"name\":\"range_100k_150k\",\"dbName\":null},{\"name\":\"above_150k\",\"dbName\":null}],\"dbName\":null},\"FamilyStatus\":{\"values\":[{\"name\":\"rich\",\"dbName\":null},{\"name\":\"upper_middle_class\",\"dbName\":null},{\"name\":\"middle_class\",\"dbName\":null},{\"name\":\"working_class\",\"dbName\":null}],\"dbName\":null},\"FamilyValues\":{\"values\":[{\"name\":\"traditional\",\"dbName\":null},{\"name\":\"moderate\",\"dbName\":null},{\"name\":\"liberal\",\"dbName\":null}],\"dbName\":null},\"AccountType\":{\"values\":[{\"name\":\"individual\",\"dbName\":null},{\"name\":\"broker\",\"dbName\":null},{\"name\":\"admin\",\"dbName\":null},{\"name\":\"moderator\",\"dbName\":null}],\"dbName\":null},\"BrokerVerificationStatus\":{\"values\":[{\"name\":\"pending\",\"dbName\":null},{\"name\":\"approved\",\"dbName\":null},{\"name\":\"rejected\",\"dbName\":null},{\"name\":\"blocked\",\"dbName\":null}],\"dbName\":null},\"AppointmentStatus\":{\"values\":[{\"name\":\"upcoming\",\"dbName\":null},{\"name\":\"completed\",\"dbName\":null},{\"name\":\"cancelled\",\"dbName\":null},{\"name\":\"rescheduled\",\"dbName\":null},{\"name\":\"pending\",\"dbName\":null}],\"dbName\":null},\"AppointmentType\":{\"values\":[{\"name\":\"video_call\",\"dbName\":null},{\"name\":\"phone_call\",\"dbName\":null},{\"name\":\"in_person\",\"dbName\":null},{\"name\":\"whatsapp\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "prisma-client/query_engine-windows.dll.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-1.0.x.so.node");
path.join(process.cwd(), "prisma-client/libquery_engine-debian-openssl-1.0.x.so.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-1.1.x.so.node");
path.join(process.cwd(), "prisma-client/libquery_engine-debian-openssl-1.1.x.so.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "prisma-client/libquery_engine-debian-openssl-3.0.x.so.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-rhel-openssl-1.0.x.so.node");
path.join(process.cwd(), "prisma-client/libquery_engine-rhel-openssl-1.0.x.so.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-rhel-openssl-1.1.x.so.node");
path.join(process.cwd(), "prisma-client/libquery_engine-rhel-openssl-1.1.x.so.node")

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-rhel-openssl-3.0.x.so.node");
path.join(process.cwd(), "prisma-client/libquery_engine-rhel-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma-client/schema.prisma")
