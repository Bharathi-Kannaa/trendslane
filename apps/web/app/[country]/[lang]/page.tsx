import BannerImage from '@/components/BannerImage/banner-image';
import { Country, Language } from '@workspace/types';

const BannerImagePage = async ({
  params,
}: {
  params: Promise<{ country: Country; lang: Language }>;
}) => {
  const { country, lang } = await params;

  return <BannerImage country={country} lang={lang} />;
};

export default BannerImagePage;
