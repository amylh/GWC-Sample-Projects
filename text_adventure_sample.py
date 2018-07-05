''' Author: Amy Lee
    GWC Sample Project Solution - Text Adventure '''

# Challenge: create a text adventure game.
# The maze: https://github.com/gammaLaser/GWC-Sample-Projects/blob/master/maze.jpg
# (It's a 5x5 grid)

# global constants
ACTIONS = ['n', 's', 'e', 'w']
ACTION_BLURBS = {'n': '[n]: go north', 's': '[s]: go south',
                 'e': '[e]: go east', 'w': '[w]: go west'}
# Map list of possible actions to each square on the grid of the maze
ACTION_MAP = [['n,e', 'w,n',   'n,e', 'w,n,e', 'w,n'],
              ['n,s', 'e,s',   'w,s', 'n,s',   'n,s'],
              ['e,s', 'w,n,e', 'w,n', 's',     'n,s'],
              ['n,e', 'w,s',   'e,s', 'w,e',   'w,n,s'],
              ['e,s', 'w,n,e', 'w,e', 'w,e',   'w,s']]
BLURB_MAP = [["You are in a sunlit room. Moss covers the stone floor.",
              "A mysterious mirror hangs on the wall before you.",
              "You are standing at the entrance to a giant, ivy-covered maze.",
              "In the corner is a stone fountain, bubbling with clear water.",
              "This room is bare. Nothing to see here."],
             ["There's a large hole in the floor. You carefully step around it.",
              "There's an empty birdcage in the corner.",
              "An ancient carving adorns one of the walls.",
              "This room is shrouded in darkness. You can't see a thing.",
              'Somewhere, you hear someone yelling, "HELLO?".'],
             ["There's a sparkly rainbow puddle on the floor.",
              "This room is filled with hanging vines.",
              "This room is super clean.",
              "Nyan cat pounces as soon as you walk throught the door.",
              "There's a doge sitting in this room. You pet him."],
             ["A panicked coder sits by the window, frantically typing.",
              "A cute turtle slowly crawls by.",
              "This room is super messy. You almost trip a few times.",
              "This room is stacked to the ceiling with...ketchup bottles???",
              "A cute drawing of...something...adorns one wall."],
             ["This room smells like coffee.",
              "This room is quite spacious.",
              "This room is filled with water. You have to swim.",
              "A sphinx sits in the middle of the room, but she ignores you.",
              "This room is all painted orange."]]

# global variables
possible_actions = []
options = ['', '', '']
x = 2
y = 0
blurb = ""
user_input = ""
status = "playing"

def get_blurb(pa):
    global possible_actions, options, x, y, user_input, blurb, status
    blurb = BLURB_MAP[y][x]
    print(blurb)
    # Print out the possible actions you can take
    actions_str = ""
    for choice in pa:
        actions_str = actions_str + ACTION_BLURBS[choice] + ".  "
    print("Possible actions: " + actions_str)

def get_input(pa):
    global possible_actions, options, x, y, user_input, blurb, status
    # Get the player's input choice
    print("What will you do? Type your action of choice: ")
    user_input = input().lower()
    if user_input in pa:
        if user_input == 'n':
            y += 1
            print("You decide to go north.\n")
        elif user_input == 's':
            y -= 1
            print("You decide to go south.\n")
        elif user_input == 'e':
            x += 1
            print("You decide to go east.\n")
        elif user_input == 'w':
            x -= 1
            print("You decide to go west.\n")
        else:
            print("Sorry, that's not a valid choice. Try again.")
            get_input(pa)
    else:
        print("Sorry, that's not a valid choice. Try again.")
        get_input(pa)

def setup():
    global possible_actions, options, x, y, user_input, blurb, status
    possible_actions = []
    x = 2
    y = 0
    user_input = ""
    blurb = ""
    status = "playing"

def game():
    global possible_actions, options, x, y, user_input, blurb, status
    setup()
    while status == "playing":
        possible_actions = (ACTION_MAP[y][x]).split(",")
        get_blurb(possible_actions)
        get_input(possible_actions)
        if x == 1 and y == 5:
            status = "win"
    print("Congrats. You solved the maze!\n")

game()
