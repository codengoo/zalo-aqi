/**
 * Loại phương tiện
 */
export enum VehicleType {
  MOTORBIKE = 'motorbike',
  CAR = 'car',
  ELECTRICBIKE = 'electricbike',
}

/**
 * Thông tin phương tiện
 */
export interface VehicleInfo {
  vehicleType: string;
  plateColor: string;
}

/**
 * Chi tiết vi phạm
 */
export interface ViolationDetail {
  violationType: string;
  time: string;
  location: string;
}

/**
 * Đơn vị xử lý
 */
export interface ProcessingUnit {
  detectingUnit: string;
  detectingAddress: string;
  resolvingUnit: string;
  resolvingAddress: string;
  phone: string;
}

/**
 * Thông tin vi phạm
 */
export interface ViolationInfo {
  plateNumber: string;
  status: string;
  vehicleInfo: VehicleInfo;
  violationDetail: ViolationDetail;
  processingUnit: ProcessingUnit;
}
