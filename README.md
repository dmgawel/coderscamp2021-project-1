# **CodersCamp 2021 - Projekt JavaScript pt. „MOVIE QUIZ”**

## **Mentor i Opiekun:** Dawid Gaweł (https://github.com/dmgawel)

## **Skład zespołu:**

1. Adriana Duplicka (https://github.com/dadriana)
2. Magdalena Czajkowska (https://github.com/MagdaCzajkowska)
3. Marcin Kaliszewski (https://github.com/MCaliJr)
4. Karol Homziuk (https://github.com/Karol-pl)
5. Mateusz Obłoza (https://github.com/zyzgz)
6. Michał Czajkowski (https://github.com/MichalCzajkowski1000)


**I. Przydział ról**

1.  **Klient** - Dawid Gaweł
2.  **Tech Lead** - Karol Homziuk
3.  **Product Owner** - Adriana Duplicka
4.  **Development Manager** - Mateusz Obłoza.


**II. Założenia projektowe**

Klient, zainspirowany Międzynarodowym Festiwalem Filmowym Nowe Horyzonty, zlecił zespołowi przygotowanie aplikacji związanej z tematyką okołofilmową.
Po wstępnym rozpoznaniu i analizie zagadnienia podjęto decyzję o przygotowaniu quizu sprawdzającego znajomość branży filmowej i ogólne w niej rozeznanie. Quiz miałby sprawdzać znajomość branży w 3 kategoriach:

1. wizerunek aktora,
2. kadr filmowy,
3. ścieżka dźwiękowa.

Powstała aplikacja to aplikacja webowa działająca w przeglądarce, bez potrzeby instalacji, wraz z wersją responsywną. W celu zaprezentowania działania, aplikacja jest możliwa do odwiedzenia w Internecie.

Stworzony w Figmie mock-up oraz prototyp interfejsu Użytkownika (https://www.figma.com/file/iyzc2xne2Y2Sewyb5nPtRt/CodersCamp-prj1?node-id=13%3A141) został zaprezentowany Klientowi i uzyskał Jego akceptację.

Klient dostarczył zespołowi listę funkcjonalności:

1. Wybór trybu quizu (Actors, Movie frames, Soundtracks).

2. Opis zasad dla quizu:

- **Actors** - pokazuje się zdjęcie przedstawiające wizerunek aktora oraz lista 4 odpowiedzi (imię i nazwisko aktora), spośród których tylko jedna jest prawidłowa;
- **Movie frames** - pokazuje się kadr z filmu oraz lista 4 odpowiedzi (tytuł filmu), spośród których tylko jedna jest prawidłowa;
- **Soundtracks** - pokazuje się lista 4 odpowiedzi (tytuł filmu), spośród których tylko jedna jest prawidłowa. Użytkownik ma możliwość odsłuchania 10-sekundowego przykładu muzycznego (ścieżki dźwiękowej z filmu) oraz wyboru odpowiedzi z listy.

3. Czas na udzielenie odpowiedzi w każdym trybie quizu jest odmierzany za pomocą zmieniających się zobrazowanych klatek taśmy filmowej i wynosi 10 sekund, przy czym w trybie Soundtracks czas na udzielenie odpowiedzi liczony jest dopiero od momentu zakończenia odsłuchiwania przykładu muzycznego.

4. Udzielenie prawidłowej odpowiedzi w wyznaczonym czasie skutkuje przyznaniem 1 punktu (per-analogiam nieprawidłowa odpowiedź = 0 punktów).

5. W przypadku braku odpowiedzi, punkt nie zostaje przyznany i zostaje wyświetlone kolejne pytanie.

6. W każdej kategorii quizu pula pytań wynosi 10.

7. Pytania są generowane w następujący sposób:

- w każdej z kategorii zostaje pobrany losowy ich zasób,
- zostanie pobrane dla wylosowanego zasobu zdjęcie ukazujące wizerunek aktora, kadr z filmu bądź przykład ścieżki dźwiękowej,
- losowane są 3 odpowiedzi z zapytania do API (jedna brana jest z wcześniej wylosowanego, musi być poprawna). Dla trybów Movie frames oraz Soundtracks będzie to: https://api.themoviedb.org/

8. Po wyczerpaniu puli 10 pytań ukazywany jest wynik gracza z możliwością udostępnienia wyniku quizu oraz linku do quizu na Facebook oraz Twitter.

**III. Wykorzystywane technologie**

Aplikacja została wykonana wg dostarczonych przez organizatorów CodersCamp wymagań. W trakcie developmentu wykorzystujemy:
- JavaScript,
- CSS, do stylowania aplikacji,
- HTML, do definiowania struktury aplikacji,
- Fetch, do łączenia z API.

**IV. Uruchomienie projektu**

Aby uruchomić aplikację na lokalnej maszynie, wykonaj następujące kroki:

1. Zainstaluj zależności za pomocą komendy: `npm install`
2. Wystartuj serwer developerski `npm run dev`

**V. Link do działającego DEMO:** https://coderscamp-movie-quiz.netlify.app/
