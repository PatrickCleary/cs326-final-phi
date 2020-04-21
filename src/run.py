#! /users/bin/env
import os


if __name__ == '__main__':  
    print('compiling typescript...')
    #compile submission typescript. We should add this for all typescript.
    os.system('tsc ./js/submission.ts')

    
    print('done compiling.')
    print('starting server at http://localhost:8080...')
    os.system('ts-node server-main.ts')