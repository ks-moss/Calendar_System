import threading
# from datetime import datetime

# Constants
MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
]

DAYS_IN_YEAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


class DOOMSDAY_OF_THE_YEAR:
    def __init__(self, year):
        self.year = year
        self.stop_threads = threading.Event()  # Shared event to signal threads to stop
        self.doomsday_century_code = None

    def calculate_century_code(self, init_century):
        doomsday_century_temp = init_century

        digitCount = len(str(abs(self.year)))
        digitCountLastTwo = digitCount - 2

        
        
        

        while not self.stop_threads.is_set():
            if doomsday_century_temp == int(str(self.year)[:digitCountLastTwo]) * (10 ** digitCountLastTwo):
                self.doomsday_century_code = {1500: 3, 1600: 2, 1700: 0, 1800: 5}.get(init_century)
                self.stop_threads.set()  # Signal other threads to stop
                return  # Exit the loop and thread
            else:
                doomsday_century_temp += 400

    def get_century_code(self):
        INIT_CENTURY = [1500, 1600, 1700, 1800]
        threads = []

        for init_century in INIT_CENTURY:
            thread = threading.Thread(
                target=self.calculate_century_code,
                args=(init_century,)  # Pass args as a tuple
            )
            thread.start()
            threads.append(thread)

        for thread in threads:
            thread.join()

        return self.doomsday_century_code

    def calculate_doomsday_year(self):

        digitCount = len(str(abs(self.year)))
        digitCountLastTwo = digitCount - 2

        twoYearAfterCentury = int(str(self.year)[digitCountLastTwo:digitCount])
        century_code = self.get_century_code()

        if century_code is None:
            raise ValueError("Century code calculation failed.")

        total_number = century_code + twoYearAfterCentury // 12 + twoYearAfterCentury % 12 + (twoYearAfterCentury % 12) // 4

        while total_number > 6:
            total_number %= 7

        return total_number  # 0-6


class DAY_OF_THE_WEEK(DOOMSDAY_OF_THE_YEAR):
    def __init__(self, year, month, date):
   
        super().__init__(year)
        self.year = year
        self.month = month
        self.date = date
  

    def is_leap_year(self, year):
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

    def calculate_day_of_the_week(self):

        provided_doomsday = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12]
        days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        try:
            index_month = MONTHS.index(self.month)
            calculated_doomsday = super().calculate_doomsday_year()

            if self.is_leap_year(self.year):
                provided_doomsday[0] = 32
                provided_doomsday[1] = 29

            doomsday_for_month = provided_doomsday[index_month]

            result = (self.date - doomsday_for_month) % 7 + calculated_doomsday
            result %= 7

            return days[result]

        except ValueError:
            return "Invalid month entered.\n"




def main():
    year = 2024

    day_of_week_instance = DAY_OF_THE_WEEK(year, "January", 1)

    for month in MONTHS:
        print(f"\n+--- Month: {month}, Year: {year}")

        if day_of_week_instance.is_leap_year(year):
            DAYS_IN_YEAR[1] = 29
        else:
            DAYS_IN_YEAR[1] = 28


        for day in range(1, DAYS_IN_YEAR[MONTHS.index(month)] + 1):
            day_of_week_instance.month = month
            day_of_week_instance.date = day
            day_of_the_week = day_of_week_instance.calculate_day_of_the_week()

            print(f"{day_of_the_week}, {day} {month} {year}")

    # stop_time = datetime.now()
    # print(f"\nStop time: {stop_time.strftime('%H:%M:%S.%f')[:-3]}")

    # duration = stop_time - start_time
    # print(f"Duration: {duration}")

if __name__ == "__main__":
    main()
