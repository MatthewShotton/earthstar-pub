#!/usr/bin/env node

import commander = require('commander');
import { serve } from './pub';

let program = new commander.Command();
program
    .name('earthstar-pub')
    .description('Run an HTTP server which hosts and replicates Earthstar workspaces.')
    .option('-p, --port <port>', 'which port to serve on', '3333')
    .option('--readonly', "don't accept any pushed data from users", false)
    .option('-c, --closed', "accept data to existing workspaces but don't create new workspaces.", false);
    //.option('-d, --dbfile <filename>', 'filename for sqlite database.  if omitted, data is only kept in memory')
    
program.parse(process.argv);

serve({
    port: +program.port,
    readonly: program.readonly,
    allowPushToNewWorkspaces: !(program.closed || program.readonly),
});
