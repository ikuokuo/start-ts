MKFILE_PATH := $(abspath $(lastword $(MAKEFILE_LIST)))
MKFILE_DIR := $(patsubst %/,%,$(dir $(MKFILE_PATH)))

.DEFAULT_GOAL := tsc

SHELL := /bin/bash

TS ?=
TSC_OPTIONS ?= -t ES2015
TSC_MODULE ?=
TSC_IGNORE_COMPILED ?= 1

ifneq ($(TSC_MODULE),)
	TSC_OPTIONS += --module es2015
endif

TSC_EXCLUDE_FILES ?= \
"./handbook/13\ modules/3_default-exports/1_", \
"./handbook/13\ modules/3_default-exports/4_", \
"./handbook/13\ modules/4_export--and-import--require/",

HTML ?=
HTML_TEMP ?= handbook/greeter.html

ifeq ($(OS),Windows_NT)
	OPEN := start
else
	UNAME_S = $(shell uname -s)
	ifneq ($(findstring Linux,$(UNAME_S)),)
		OPEN := xdg-open
	else ifneq ($(findstring Darwin,$(UNAME_S)),)
		OPEN := open
	else
		$(error "Can't detect host os")
	endif
endif

define echo
	text="$1"; options="$2"; \
	[ -z "$$options" ] && options="33"; \
	echo -e "\033[$${options}m$${text}\033[0m"
endef

define tsc_excluded
	excluded=false; \
	files="$(TSC_EXCLUDE_FILES)"; \
	IFS=","; files_array=($$files); unset IFS; \
	for file in "$${files_array[@]}"; do \
		if [[ "$1" == "$${file## }"* ]]; then \
			excluded=true; break; \
		fi \
	done
endef

define tsc
	ts="$1"; \
	if [ -z "$$ts" ]; then \
		$(call echo,make TS=?,35); \
	elif [ ! -f "$$ts" ]; then \
		$(call echo,$$ts not found,35); \
	elif [ "$${ts##*.}" != "ts" ]; then \
		$(call echo,$$ts not *.ts,35); \
	else \
		$(call tsc_excluded,$${ts}); \
		\
		if [ "$${excluded}" = "true" ]; then \
			$(call echo,tsc $$ts \033[34mexcluded\033[0m,32); \
		else \
			tsc_ignore="$2"; \
			if [ -n "$$tsc_ignore" -a -f "$${ts%.ts}.js" ]; then \
				$(call echo,tsc $$ts \033[33mignored\033[0m,32); \
			else \
				$(call echo,tsc $$ts $(TSC_OPTIONS),32); \
				tsc "$$ts" $(TSC_OPTIONS) || exit 1; \
			fi \
		fi \
	fi
endef

define html
	ts="$1"; temp="$2"; \
	[ -f "$$temp" ] || exit 0; \
	js="$${ts%.ts}.js"; \
	if [ ! -f "$$js" ]; then \
		$(call echo,$$js not found,35); \
	else \
		html="$${ts%.ts}.html"; \
		if [ -f "$$js" ]; then \
			$(call echo,new $$html,32); \
			sed "s/@MY_JS@/$${js##*/}/g" < $$temp > "$$html"; \
		fi; \
		if [ -f "$$html" ]; then \
			$(call echo,$(OPEN) $$html,32); \
			$(OPEN) "$$html"; \
		fi \
	fi
endef

.PHONY: tsc
tsc:
	@$(call tsc,$(TS),$(TSC_IGNORE_COMPILED))
	@if [ -n "$(HTML)" ]; then $(call html,$(TS),$(HTML_TEMP)) fi

.PHONY: all
all:
	@find . -type f -name "*.ts" ! -path "./node_modules/*" | while read -r p; do \
		$(call tsc,$$p,$(TSC_IGNORE_COMPILED)); \
		if [ -n "$(HTML)" ]; then \
			$(call html,$$p,$(HTML_TEMP)); \
		fi \
	done

.PHONY: clean
clean:
	@$(call echo,clean generated *.js)
	@find . -path ./node_modules -prune -o -type f -name "*.js" -print0 | \
	xargs -0 -I {} bash -c 'echo "rm {}" && rm "{}"'
	@$(call echo,clean generated *.html)
	@find . \( -path ./node_modules -o -path ./handbook/*.html \) -prune -o -type f -name "*.html" -print0 | \
	xargs -0 -I {} bash -c 'echo "rm {}" && rm "{}"'
