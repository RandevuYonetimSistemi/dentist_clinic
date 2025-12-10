#!/usr/bin/env python
#
# converter from sequence to mass (mass/charge), which accepts peptides/protines in fasta format
#
#
#  *********************************** READ ME FIRST ********************************
#  This template script currently doesn't work. There are lots of bits
#  missing. You can fill them in to get it to complete the task. However,
#  thats not an easy thing to do, so we suggest you make a new python script,
#  and slowly add bits from this one into it, make sure its working, and then 
#  add some more. That way you can make step by step progress. Have a good look 
#  at this code, and make your own pseudocode plan first, before you start coding
#  your own scripts
#  **********************************************************************************
#
#
# def functions
#

def fastaread(filename):    # may not be needed at all for this task? But included for completeness
#
# open Fasta file for reading
#
	"""Opens and reads in a Fasta formatted file 

	This function takes a single argument, the name of an external file
	and opens it for reading to the fastafile handle, reads all the lines
	in, one go, into "lines". It expects sequence names to be in lines beginning
	with the ">" character. It returns two objects, a list containing the sequence
	names (first word on line) in order, as well as a dictionary with the actual
	sequences keyed on the sequence names
	"""
	with open( filename, "r") as fastafile:
		lines = fastafile.readlines();
#
#  use a list and dictionary to store sequence names and sequences  - a nice simple structure for seq data
#
	order = []    	# list
	seqs = {}		# dictionary 
	current = None   # track which sequence we are filling

	for line in lines:  						# iterate over fast file, line by line 
		line = line.strip()
		
		if line.startswith('>'):				# for header lines, parse out first word
	
#			do something here 
			name = line[1:].split()[0]        # extract sequence name
			order.append(name)                # add name to order list
			seqs[name] = ""                   # initialize empty sequence string
			current = name                    # mark this as current sequence

		else:

#			do something else here 
			if current is not None:           # append sequence lines
				seqs[current] = seqs[current] + line


	return (order, seqs)

# -------------------------------------------------
#
# pep2mass - function to convert a sequence string, contained in 'seq' to a mass
# It will use one of two possible look-up dictionaries, which is determined by 'type'
def pep2mass(seq, type):
    mono = {'A' :71.0371, 'C' :103.0092, 'D' :115.0269, 'E' :129.0426, 'F' :147.0684, 'G' :57.0215, 'H' :137.0589, 'I' :113.0841, 'K' :128.0950, 'L' :113.0841, 'M' :131.0405, 'N' :114.0429, 'P' :97.0528, 'Q' :128.0586, 'R' :156.1011, 'S' :87.0320, 'T' :101.0477, 'V' :99.0684, 'W' :186.0793, 'Y' :163.0633, '*' :0.0}
    aver = {'A' :71.08, 'C' :103.14, 'D' :115.09, 'E' :129.12, 'F' :147.18, 'G' :57.05, 'H' :137.14, 'I' :113.16, 'K' :128.17, 'L' :113.16, 'M' :131.19, 'N' :114.10, 'P' :97.12, 'Q' :128.13, 'R' :156.19, 'S' :87.08, 'T' :101.10, 'V' :99.13, 'W' :186.21, 'Y' :163.18, '*' :0.0}
    waterM = 19.0106 ## adds the masses of the terminating groups and the charge mass for each new peptide)
    waterA = 19.0153 ## as above
#
# add some code in here. You need to work out how to decide which mass type to use,
# load up new dicts perhaps, then work through the sequence one letter at a time
# converting seq to mass as you go. Finally, for each peptide, add the appropriate
# water mass too, then return it
#
    if type =="mono":
        table = mono
        water = waterM
        
    else: 
        table = aver
        water = waterA
        
    mass= 0.0
    
    
    for aa in seq: 
        if aa not in table:
            return None
        mass = mass + table[aa]
        
    pepmass = mass + water                   

    return pepmass

#
# main program
#

if __name__ == "__main__":
	
#
#  We've given you some argparse code to get you started, but you can adapt this and add more if you wish
#

	import argparse

	masstype = ['a','m']
	parser = argparse.ArgumentParser(description='convert peptide sequences to masses, read from a Fasta file')
	parser.add_argument("fileName")     # a positional argument
#
# can you add something here to allow the user to select mono or aver, as mutually exclusive events?
#
	args = parser.parse_args()

	inputfile = args.fileName
	outputfile = "pepmasses.out"    # default value, would be nice to let the user choose this too
	masstype = "mono" 				# currently hardcoded as 'mono' but you ought to be able to allow the user to choose
    
    if args.aver:
        masstype= "aver"
    else:
        masstype = "mono"

	ofile = open(outputfile,'w') #  you can add a command line argument perhaps using argparse to allow the user to control this?

	with open(inputfile,'r') as fastafile:
        order, seqs = fastaread(inputfile)
        for name in order:
            seq = seqs[name]
            pepmass = pep2mass(seq, masstype)
            if pepmass is None:
                ofile.write(f"{name}\tERROR\tUnknown amino acid\n")
            else:
                ofile.write(f"{name}\t{pepmass:.4f}\t{seq}\n")

#
#  Write the code here, to read lines from the file opened as 'fastafile'
#  then if its header line (with a '>' start) capture the info you need, and 
#  if its a sequence line (not a header) then read in the sequence and send it 
#  off to the pep2mass function, then print out all the information in the appropriate format
#
		# dont forget to indent 
else:
	print("run as module\n")
