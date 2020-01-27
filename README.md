# BeholderBattle
App Script for Googlesheet

This script was created to randomize a battle between D&D Players and a 5e Beholder.
The Beholder's eye beam attack is a random choice of 10 possibilities. For the encounter I also choose to have it randomly choose players that it would attack.

0.1
Player is randomly chosen.
Attack is randomly chosen.
A pop up will ask about saves, if the player saves it will answer with 1/2 damage (if applicable), otherwise it responds with what should happen (damage, petrification, sleep, etc.).

Needs:
Of the 3 attacks per turn, it should not be able to repeat the same type of attack.
Way to many calls to the spreadsheet.
Waiting for save results can cause the program to timeout.
Potential for infinate loop when looking for eleigable players.
