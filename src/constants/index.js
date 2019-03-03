import ProdConstants from '@/constants/prod';
import DevConstants from '@/constants/dev';
const isProduction = process.env.NODE_ENV === 'production';

export default isProduction ? ProdConstants : DevConstants;
