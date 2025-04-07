export async function getCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data.map((country: any) => ({
      code: country.idd.root + (country.idd.suffixes?.[0] || ''),
      name: country.name.common
    })).sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

export async function fakeStore() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  return data;
}