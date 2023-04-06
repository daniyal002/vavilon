React.useEffect(() => {
  let page = 3;
  fetch(`https://kinobd.ru/api/films?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      const films = data.data;
      const extractedData = films.map((film) => {
        return {
          title: film.name_russian,
          poster: film.small_poster,
          description: film.description,
          rating: film.rating_kp,
          age_restriction: film.age_restriction,
          trailer: film.trailer,
        };
      });
      setMovieList(extractedData);
      extractedData.forEach((element) => {
        const bodyJ = {
          title: element.title,
          poster: element.poster,
          description: element.description,
          rating: element.rating,
          age_restriction: element.age_restriction,
          trailer: element.trailer,
        };

        fetch("http://localhost:3000/filmslist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyJ),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Data was successfully added to the database:", data);
          })
          .catch((error) => {
            console.error(
              "There was a problem adding data to the database:",
              error
            );
          });
      });
      // отправить extractedData на сервер приложений
    });
}, []);
