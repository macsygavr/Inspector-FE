const baseApiPath =
  "https://suggest-maps.yandex.ru/v1/suggest?apikey=a609f4ec-910c-4afe-aa91-bb18c5bcdd4b&types=house&print_address=1&results=10&lang=ru_RU";

type AddressSuggestionsResponse = {
  results: {
    address: {
      component: {
        name: string;
        kind: string[];
      }[];
    };
    title: {
      text: string;
      hl: [
        {
          begin: number;
          end: number;
        },
        {
          begin: number;
          end: number;
        }
      ];
    };
    subtitle: {
      text: string;
    };
  }[];
};

export const getAddressSuggestions = (
  city: string,
  text: string
): Promise<AddressSuggestionsResponse> => {
  return fetch(`${baseApiPath}&text=Россия, ${city}, ${text}`)
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};
