# MCP (Model Context Protocol) Configuration

This directory contains configurations for Model Context Protocol servers used in the Janbhasha project.

## Overview

MCP servers extend the capabilities of Claude and other AI assistants by providing structured access to:
- GitHub repositories and operations
- File system operations
- PostgreSQL database
- Documentation and knowledge bases

## Configuration Files

### `mcp.json`
Central configuration file that defines all MCP servers and their connection parameters.

```json
{
  "servers": {
    "github": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    },
    "postgres": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"]
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    }
  }
}
```

## Server Configurations

### GitHub Server (`servers/github.json`)
- Enables repository operations
- Allows reading and creating issues
- Supports pull request management
- Requires GitHub authentication token

### PostgreSQL Server (`servers/postgres.json`)
- Database query capabilities
- Schema inspection
- Data analysis and reporting

### Filesystem Server (`servers/filesystem.json`)
- Safe file system access
- Read/write operations
- Directory traversal with sandboxing

### Documentation Server (`servers/docs.json`)
- Internal documentation access
- Project knowledge base
- Architecture and design docs

## Usage

AI assistants can access these capabilities through standard MCP protocols when these servers are configured and running.

### Example: GitHub Operations
- Search issues and PRs
- Create branches and commits
- Manage pull requests and reviews

### Example: Database Access
- Query learner progress data
- Analyze language model performance
- Generate reports on assessment results

### Example: File Operations
- Read project files
- Create new components
- Modify configurations

## Security Considerations

- All credentials should be managed via environment variables
- MCP servers run in isolated processes
- File system access is sandboxed to project directories
- Database connections use principle of least privilege

## Adding New MCP Servers

To add a new MCP server:

1. Create a new configuration file in `servers/`
2. Register it in `mcp.json`
3. Document capabilities in this README
4. Add authentication details to `.env`

## Documentation

- [MCP Protocol Specification](https://modelcontextprotocol.io)
- Agent-specific MCP usage: See `.ai/agents/` directory
- Service documentation: See `docs/` directory

---

For setup instructions, see the main README.md
