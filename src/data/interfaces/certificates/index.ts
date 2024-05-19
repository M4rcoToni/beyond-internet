export interface ICertificate {
  courseId: string
  completionPercentage: number
  courseName: string
  completionDate?: string | null
  courseImage: string
}

export interface ICertificatesRepository {
  getCertificates: () => Promise<ICertificate[]>

  generateCertificate: (courseId: string, username: string) => Promise<void>
}

export interface ICertificatesService {
  getCertificates: () => Promise<ICertificate[]>

  generateCertificate: (courseId: string, username: string) => Promise<void>
}
