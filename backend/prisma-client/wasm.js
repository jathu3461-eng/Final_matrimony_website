
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
