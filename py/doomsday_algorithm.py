import threading


# Constants
MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
]

DAYS_IN_YEAR = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

PROVIDED_DOOMSDAY = [3, 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12]

DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]




class DOOMSDAY_OF_THE_YEAR:
    def __init__(self):
        self.year = None
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

    def is_leap_year(self):

        if self.year % 4 == 0 and (self.year % 100 != 0 or self.year % 400 == 0):
            DAYS_IN_YEAR[1] = 29
            PROVIDED_DOOMSDAY[0] = 32
            PROVIDED_DOOMSDAY[1] = 29
        else:
            DAYS_IN_YEAR[1] = 28
            PROVIDED_DOOMSDAY[0] = 31
            PROVIDED_DOOMSDAY[1] = 28





class DAY_OF_THE_WEEK(DOOMSDAY_OF_THE_YEAR):
    def __init__(self):
        super().__init__()
        self.month = None
        self.date = None
        self.calculated_doomsday = None

    def set_year(self, year):
        self.year = year
        self.stop_threads.clear()
        self.doomsday_century_code = None
        super().is_leap_year()

    def set_date(self, month, date):
        self.month = month
        self.date = date
        self.calculated_doomsday = self.calculate_doomsday_year()

    def calculate_day_of_the_week(self):

        try:
            doomsday_for_month = PROVIDED_DOOMSDAY[MONTHS.index(self.month)]

            result = (self.date - doomsday_for_month) % 7 + self.calculated_doomsday
            result %= 7

            return result
            # return DAYS[result]

        except ValueError:
            return "Invalid month entered.\n"
       
        
    def input_data(self, years):

        return_value =[]
        temp = []

        month = "January"
        start_date = 1

        for year in years:

            self.set_year(year)

            for month in MONTHS[MONTHS.index(month):]:
                temp = []

                for day in range(start_date, DAYS_IN_YEAR[MONTHS.index(month)] + 1):

                    self.set_date(month, day)
                    temp.append(f"{self.calculate_day_of_the_week()},{day},{month},{year}")

                # start_date = 1

                return_value.append(temp)
        
        return return_value
    




def insert_data(years):
        
        years = list(map(int, years))

        calendar = DAY_OF_THE_WEEK()
        result = calendar.input_data(years)

        return result





# from datetime import datetime

# def main():

#     start_time = datetime.now()

#     result = insert_data([1002024])


#     stop_time = datetime.now()
#     print(f"\nStart time: {start_time.strftime('%H:%M:%S.%f')[:-3]}")
#     print(f"Stop time: {stop_time.strftime('%H:%M:%S.%f')[:-3]}\n")

#     duration = stop_time - start_time
#     print(f"Duration: {duration}\n")

#     print(result)




# if __name__ == "__main__":
#     main()