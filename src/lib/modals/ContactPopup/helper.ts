import { countriesWithRegionCode } from "@/components/Contacts/helper";

export const removeCountryCode = (phoneNumber: any) => {
    const country = countriesWithRegionCode?.find((country: any) =>
      phoneNumber?.startsWith(country.dial_code)
    );
    
    if (country) {
      const phoneWithoutCode = phoneNumber?.replace(country.dial_code, '');
      return {
        country: country.dial_code,
        phoneWithoutCode: phoneWithoutCode?.trim()
      };
    } else {
      return {
        country: null,
        phoneWithoutCode: phoneNumber
      };
    }
  };