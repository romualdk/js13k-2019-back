
Tileset original
  Kenney 1-Bit Pack
  https://www.kenney.nl/assets/bit-pack

Font original
  ZX Evolution (ATM Turbo) (8x8)
  https://www.gridsagegames.com/rexpaint/resources.html

  '<' = heart
  '>' = diamond
  '@' = !

SCREEN = 27 x 27 tls

MAP = 27 x 27 tls = 432 x 432 px
UI = 13 x 14 tls = 208 x 224 px


https://gamefaqs.gamespot.com/nes/522595-final-fantasy/faqs/57009

## Classess

FI = Fighter
TH = Thief
BB = Black Belt
KN = Kinght
NI = Ninja
RM = Red Mage
WM = White Mage
BM = Black Mage

## Exp table

1. Exp to next level
  Lv2 = 40
  Lv2...L29 = 40 * (L - 1) ^ 2 - (Lv - 1) ^ 2
  Lv30..L50 = 

## Attack

1. Damage

Damage = A...2A - D
Critical Damage = 2 x (A...2A) - D

2. Chance to Hit

  BC = Base Chance to Hit = 168
  Chance to Hit = BC + H - E
  
  R = Random number 0...200
  If R <= Chance to Hit then hit
  0 always hit
  200 always miss

## Magic

SA = Single Ally
SE = Single Enemy
AA = All Allies
AE = All Enemies

Name  Efctvity  Accuracy  Tgt Effect            Usable
CURE  16        0         SA  HP Revovery       WM RM KN
CUR2  33        0         SA  HP Revovery       WM RM KN
CUR3  66        0         SA  HP Revovery       WM RM
CUR4  0         0         SA  Full HP Recovery  WM
HEAL  12        0         AA  HP Revovery       WM
HEL2  48        0         AA  HP Revovery       WM
HEL3  48        48        AA  HP Recovery       WM
HARM  20        24        AE  Damage Undead     WM
HRM2  40        24        AE  Damage Undead     WM
HRM3  60        24        AE  Damage Undead     WM
FIRE  10        24        SE  Damage            BM RM NI
FIR2  30        24        AE  Damage            BM RM NI
FIR3  50        24        AE  Damage            MB RM
LIT   10        24        SE  Damage            BM RM NI
LIT2  30        24        SE  Damage            BM RM NI
LIT3  60        24        AE  Damage            BM RM
ICE   20        24        SE  Damage            BM RM NI
ICE2  40        24        AE  Damage            BM RM NI
ICE3  70        24        AE  Damage            BM RM NI

### Damage

E = Effectivity

Resisted Attack Spell
Damage = E...2E

Unresisted Attack Spell
Damage = 2(E...2E)

### Chance to hit

SA = Spell Accuracy
MD = Magic Defense
BC = Base Chance to Hit = 148

If target Resistant then BC = 0
If target Weak then BC += 40
If target Resistant and weak then BC = 40

Chance to Hit = BC + SA - MD

R = Random numer 0...200
If R <= Chance to Hit then hits
R = 0 always hits
R = 200 always miss





