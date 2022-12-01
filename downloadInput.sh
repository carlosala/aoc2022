#!/usr/bin/zsh

source .env # add AUTH_COOKIE

if [[ $# -ne 1 ]]; then
  echo "Run the script with one argument, the day you want to download!"
  return 1
fi

day=$1
[[ $day < 10 ]] && day="0$day"
file=src/$day/input.ts

echo 'export const i = `' > $file
curl -sS -b "session=$AUTH_COOKIE" --create-dirs https://adventofcode.com/2022/day/$1/input >> $file
echo '`;' >> $file
