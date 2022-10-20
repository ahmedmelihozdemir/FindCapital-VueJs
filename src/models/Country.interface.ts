export interface ICountry {
    name: {
        common: string;
        official: string;
        nativeName: {
            eng: {
                official: string;
                common: string;
            };
        };
    };
    capital: Array<string>;
    altSpellings: Array<string>;
    region: string;
    subregion: string;
    population: number;
    continent: Array<string>;
    flags: {
        png: string;
        svg: string;
    };
}
