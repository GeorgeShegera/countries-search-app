export interface Country {
    countryCode: string,
    name: string,
}

export interface CountryDetails{   
    commonName: string,
    officialName: string,
    countryCode: string,
    region: string,
    borders: string[]
}

export interface Holiday  {
    date: string,
    localName: string,
    name: string,
    countryCode: string,
    fixed: boolean,
    global: boolean,
    counties?: string[] | null,
    launchYear: number | null,
    types?: string[] | null,
}